import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql';
import { Employee } from './Employee'

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn({ type: 'date' })
  createdAt: Date 

  @Field(() => String)
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date = new Date()

  @Field()
  @Column()
  reviewedBy: number

  @Field()
  @Column()
  rating: number
  
  @Field()
  @Column()
  feedback: string
  
  @Field()
  @Column({ default: false })
  isCompleted: boolean

  @ManyToOne(() => Employee, (employee) => employee.reviews)
  reviewedEmployee: Employee
}