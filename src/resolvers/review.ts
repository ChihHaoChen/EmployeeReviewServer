import { Review } from "../entities/Review";
import { Arg, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Employee } from "../entities/Employee"


@InputType()
class SubmitReviewInput {
  @Field()
  reviewedBy: string
  @Field()
  reviewedEmployeeId: number
  @Field()
  feedback: string
  @Field()
  rating: number
}

@InputType()
class ReviewAdminInput {
  @Field()
  reviewedEmployeeId: number
  @Field()
  feedback: string
  @Field()
  rating: number
}

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class ReviewResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Review, { nullable: true })
  review?: Review
}
@Resolver(() => Review)
export class ReviewResolver  {
  // Views reviews
  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return await Review.find()
  }

  @FieldResolver(() => Employee)
  async reviewedEmployee(@Root() review: Review): Promise<Employee | undefined> {
    return await Employee.findOne({ id: review.reviewedEmployeeId})
  }

  @Mutation(() => Review)
  async assignReview(
    @Arg('reviewerName') reviewedBy: string,
    @Arg('revieweeId') revieweeId: number,
  ): Promise<Review | undefined> {
    const unfinishedReview =
      await Review.findOne({
        where: { reviewedBy, reviewedEmployeeId: revieweeId, isCompleted: false },
        relations: ['reviewedEmployee']
      })
    
    if (unfinishedReview !== undefined) return
    
    return await Review.create({
      reviewedBy: reviewedBy,
      reviewedEmployeeId: revieweeId,
      feedback: ''
    }).save()
  }

  @Mutation(() => Review)
  async deleteReview(@Arg('reviewedEmployeeId') revieweeId: number): Promise<void> {
    const reviewsLinkedToDeletedReviewee = await Review.find({ where: { reviewedEmployeeId: revieweeId } })
    reviewsLinkedToDeletedReviewee.map(review => Review.delete(review))
  }

  @Mutation(() => Review)
  async adminReview(@Arg('reviewAdminInput') { feedback, rating, reviewedEmployeeId }: ReviewAdminInput): Promise<Review> {
    const existingAdminReview = await Review.findOne({ reviewedBy: 'admin', reviewedEmployeeId })
    const inputState = {
      reviewedBy: 'admin',
      reviewedEmployeeId: reviewedEmployeeId,
      isCompleted: true,
      rating,
      feedback
    }
    
    if (existingAdminReview !== undefined) {
      Object.assign(existingAdminReview, inputState)
      await existingAdminReview.save()

      return existingAdminReview
    }
    return await Review.create(inputState).save()
  }

  
  @Mutation(() => ReviewResponse)
  async submitFeedback(
    @Arg('submitInput') { reviewedBy, feedback, rating, reviewedEmployeeId }: SubmitReviewInput,
  ): Promise<ReviewResponse> {
  
    const draftReview = await Review.findOne({ reviewedBy, reviewedEmployeeId })
    if (!draftReview) {
      return {
        errors: [{
          field: "database",
          message: "No this piece of data in database"
      }]}
    }

    Object.assign(draftReview, {
      feedback,
      rating,
      isCompleted: true
    }) 
    await draftReview.save()
   
    return { draftReview } as ReviewResponse
  }
}