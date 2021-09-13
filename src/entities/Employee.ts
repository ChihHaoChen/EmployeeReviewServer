import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm'
import { Field, ObjectType } from 'type-graphql';
import { Review } from './Review'

@ObjectType()
@Entity()
export class Employee extends BaseEntity {
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
  @Column({ type: 'text'})
  name!: string;

  @OneToMany(() => Review, (review) => review.reviewedEmployee, { eager: true })
  reviews: Review[]
}