# Brief Report about The Challenge

## Features and database schema

![challenge.svg](Brief%20Report%20about%20The%20Challenge%20c7fa6c1703824073be8aeb112288a129/challenge.svg)

## Client Side (http://localhost:3000)

### Assumptions

1. No global state management, therefore, whenever database is updated through the developed server, the client side has to be refreshed to fetch the most updated data.
2. 3 pages for the user flow:
    1.  one page for user to enter into the admin mode and employee mode;

        ![Screen Shot 2021-09-16 at 9.57.06 AM.png](BriefReport/Screen_Shot_2021-09-16_at_9.57.06_AM.png)

    2. one page to allow the admin to add/remove/update/view employees, and also admin can assign other employees for peer reviews;

        ![Screen Shot 2021-09-16 at 9.58.29 AM.png](BriefReport/Screen_Shot_2021-09-16_at_9.58.29_AM.png)

    3. one page to allow employees to submit their peer reviews, and to show message if no assigned reviews left.
        - No reviews assigned or all assigned reviews are submitted already.

        ![Screen Shot 2021-09-16 at 10.10.59 AM.png](BriefReport/Screen_Shot_2021-09-16_at_10.10.59_AM.png)

        - With assigned reviews not submitted yet.

        ![Screen Shot 2021-09-16 at 10.12.40 AM.png](BriefReport/Screen_Shot_2021-09-16_at_10.12.40_AM.png)

3. Styles are mainly focused in the UI components for primary function, and limited styling due to time limit.
4. Although Next.js is employed in this challenge project, no SSR has been implemented yet.

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

### Client Side (/web)

```jsx
yarn install // To install the used libraries
yarn dev // To start the client side
```

## Todo Item for Further Improvements

- Refactoring is necessary for cleaner code, better readability, and modularization of code;
- Global state statement or more modern state management libraries can be used to have a responsive frontend;
- Urql ([https://formidable.com/open-source/urql/](https://formidable.com/open-source/urql/)) and its related libraries can be further studied and developed to allow SSR under the Next.js framework.
- Better UI components and UI design, for instance, the employee card container to view the feedback can be collapsed or design in a carousel style for cleaner UI.