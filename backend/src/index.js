"use strict";
// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');
// const { request, gql } = require('graphql-request');
exports.__esModule = true;
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');
// const query = gql`{ hello }`;
// request('http://localhost:4000/graphql', query)
// .then((data) => {console.log(JSON.stringify(data))})
// .catch((data) => {console.log(JSON.stringify(data))});
var database_1 = require("./data/database");
console.log('starting');
database_1["default"].init().then(function (x) { console.log(x); });
console.log("fuck");
