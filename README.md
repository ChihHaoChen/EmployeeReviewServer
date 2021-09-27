# Brief Report about The Challenge

## Features and database schema

![challenge.svg](BriefReport/challenge.svg)


## Server Side (http://localhost:4000/graphql)

1. Considering limited bandwidth and reducing the frequency of back-and-forth communication, the server side is developed with GraphQL.
2. No sessions and no tokens for different users are implemented.
3. Ids of Employee and Review identities are all integers for easier development.
4. Although rating field is implemented in the entity file, the related UI in frontend and resolvers in backend are not implemented yet.
5. Due to time constraints, the FieldResolver is only implemented when necessary to reduce the number of queries to the PostgreSQL database. For instance, currently only the reviewedEmployee field is implemented for knowing whom to be reviews when employees are editing their reviews.

## Configuration and Running the Code

```jsx
# For database configuration in /server/src/index.ts
await createConnection({
    type: 'postgres',
    database: 'employeeReviews',
    username: 'jenson',
    password: '0716',
    logging: true,
    synchronize: true,
    entities: [Employee, Review],
  })
```

The above database can be renamed with other, and also the username and password can be changed according to your PostgreSQL configuration in your local environment.

### Server Side (/server)

```jsx
yarn install // To install the used libraries
yarn watch  // To compile the ts files into js ones
yarn dev // To start the server
```

## Todo Item for Further Improvements

- Refactoring is necessary for cleaner code, better readability, and modularization of code.
