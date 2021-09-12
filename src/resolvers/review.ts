import { Review } from "../entities/Review";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";


@InputType()
class SubmitReviewInput {
  @Field()
  reviewedBy: number
  @Field()
  reviewedEmployee: number
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

  @Mutation(() => ReviewResponse)
  async submitFeedback(
    @Arg("submitInput") { reviewedBy, reviewedEmployee, feedback, rating }: SubmitReviewInput,
  ): Promise<ReviewResponse> {
  
    
    const draftReview = await Review.findOne({ where: {reviewedBy, reviewedEmployee} })
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
   
    console.log('draft =>', draftReview)
    return { draftReview } as ReviewResponse
  }
}