import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql';

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
  reviewedEmployee: number

  @Field()
  @Column()
  rating: number

  @Field()
  @Column()
  feedback: string

  @Field()
  @Column({ default: false })
  isCompleted: boolean
}