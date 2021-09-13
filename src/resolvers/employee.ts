import { Employee } from "../entities/Employee";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
// import { Review } from "../entities/Review";

@Resolver()
export class EmployeeResolver  {
  // Views all employees
  @Query(() => [Employee])
  async employees(): Promise<Employee[]> {
    return await Employee.find()
  }

  // Views a specific employee
  @Query(() => Employee, { nullable: true })
  async employee(@Arg('id') id: number): Promise<Employee | undefined> {
    return await Employee.findOne(id)
  }

  // Creates a new employee
  @Mutation(() => Employee)
  async createEmployee(@Arg('name') name: string): Promise <Employee> {
    const newEmployee = Employee.create({ name }).save()
    return newEmployee
  }

  // Updates a existent employee
  @Mutation(() => Employee, { nullable: true })
  async updateEmployee(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
  ): Promise<Employee | null> {
    
    const updatedEmployee = await Employee.findOne(id)
    if (!updatedEmployee) {
      return null
    }
    if (name) {
      // await Employee.update({ id }, { name })
      Object.assign(updatedEmployee, { name })
      await updatedEmployee.save()
    }
  
    return updatedEmployee
  }

  // Updates a existent employee
  @Mutation(() => Employee)
  async deleteEmployee(
    @Arg('id', () => Int) id: number,
  ): Promise<Employee | undefined> {
    const deletedEmployee = await Employee.findOne(id)
    
    await Employee.delete(id)  
    
    return deletedEmployee
  }

  // @Mutation(() => Review)
  // async assignReview(
  //   @Arg('reviewee', () => Int) revieweeId: number,
  //   @Arg('reviewer', () => Int) reviewerId: number,
    
  // ): Promise<Review> {
  //   const reviewer = await Employee.findOne(reviewerId)
  //   const reviewee = await Employee.findOne(revieweeId)
  //   const newReviewAssignment = Review.create({
  //     reviewedBy: reviewer,
  //     reviewedEmployee: reviewee,
      
  //   })
  //   Object.assign(newReviewAssignment, {
  //     feedback: {},
  //     rating: 0
  //   })
  //   await newReviewAssignment.save()

  //   return newReviewAssignment

  // }
}