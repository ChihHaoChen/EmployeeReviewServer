import 'reflect-metadata'
import express from 'express'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { EmployeeResolver } from './resolvers/employee'
import { ReviewResolver } from './resolvers/review'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Review } from './entities/Review'
import { Employee } from './entities/Employee'

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'employeeReviews',
    username: 'jenson',
    password: '0716',
    logging: true,
    synchronize: true,
    entities: [Employee, Review],
  })

  // await Employee.delete({})
  // await Review.delete({})

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [EmployeeResolver, ReviewResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  })

  await apolloServer.start()
  const app = express()

  app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://studio.apollographql.com" 
    ]
  }))

  apolloServer.applyMiddleware({
    app,
    cors: false
  })


  app.listen(4000, () => {
    console.log('server starteD')
  })

}

main().catch(err => console.error(err))
