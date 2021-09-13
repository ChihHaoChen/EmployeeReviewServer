import { Review } from "../entities/Review";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
// import { isAdmin } from "../middleware/isAdmin";
// import { Employee } from "src/entities/Employee"


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

@Resolver()
export class ReviewResolver  {
  // Views reviews
  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return await Review.find()
  }

  @Query(() => [Review], { nullable: true })
  async reviewsOfEmployee(@Arg('id') id: number): Promise<Review[] | undefined> {
    const totalReviews = await Review.find()
    return totalReviews.filter((review) => review.reviewedEmployeeId === id)
  }

  @Mutation(() => Review)
  async assignReview(
    @Arg('reviewerName') reviewedBy: string,
    @Arg('revieweeId') revieweeId: number
  ): Promise<Review> {
    return Review.create({
      reviewedBy: reviewedBy,
      reviewedEmployeeId: revieweeId,
      feedback: ''
    }).save()
  }

  @Mutation(() => Review)
  async adminReview(@Arg('reviewAdminInput') { feedback, rating, reviewedEmployeeId }: ReviewAdminInput): Promise<Review> {
    return Review.create({
      reviewedBy: 'admin',
      reviewedEmployeeId: reviewedEmployeeId,
      isCompleted: true,
      rating,
      feedback
    }).save()
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