"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const employee_1 = require("./resolvers/employee");
const review_1 = require("./resolvers/review");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Review_1 = require("./entities/Review");
const Employee_1 = require("./entities/Employee");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'employeeReviews',
        logging: true,
        synchronize: true,
        entities: [Employee_1.Employee, Review_1.Review],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [employee_1.EmployeeResolver, review_1.ReviewResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:3000",
            "https://studio.apollographql.com"
        ]
    }));
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.listen(4000, () => {
        console.log('server started');
    });
};
main().catch(err => console.error(err));
//# sourceMappingURL=index.js.map