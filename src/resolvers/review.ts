import { Review } from "../entities/Review";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
// import { Employee } from "src/entities/Employee"


@InputType()
class SubmitReviewInput {
  @Field()
  reviewedBy: number
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
    @Arg("submitInput") { reviewedBy, feedback, rating }: SubmitReviewInput,
  ): Promise<ReviewResponse> {
  
    
    const draftReview = await Review.findOne({ where: {reviewedBy} })
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