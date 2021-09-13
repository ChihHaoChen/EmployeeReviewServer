import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql';
import { Employee } from './Employee'

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  reviewedBy: string

  @Field()
  @Column({ type: "int", default: 0 })
  rating: number
  
  @Field()
  @Column()
  feedback: string
  
  @Field()
  @Column({ default: false })
  isCompleted: boolean

  @Field()
  @Column()
  reviewedEmployeeId: number

  @ManyToOne(() => Employee, (employee) => employee.reviews)
  reviewedEmployee: Employee

  @Field(() => String)
  @CreateDateColumn({ type: 'date' })
  createdAt: Date 

  @Field(() => String)
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date = new Date()
}