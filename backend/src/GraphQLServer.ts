import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, concatAST, GraphQLSchema } from 'graphql';
import Project from './read/Project';
import ProjectInput from './write/ProjectInput';
import { ProjectInputArgs } from './write/ProjectInput';
import apiSchema from './apiSchema';
import APIRoot from './APIRoot';

class GraphQLServer {
  constructor() {
    this.run = this.run.bind(this);
    this.generateRoot = this.generateRoot.bind(this);
    this.startExpress = this.startExpress.bind(this);
  }

  public async run() {
    let root = this.generateRoot();
    return await this.startExpress(root);
  }

  generateRoot() {
    let root = new APIRoot();
    return root;
  }

  async startExpress(root: any) {
    let app = express();
    app.use(
      '/project',
      graphqlHTTP({
        schema: apiSchema,
        rootValue: root,
        graphiql: true,
      })
    );
    let promise = new Promise((resolve, reject) => {
      try {
        app.listen(4000, () => {
          resolve(
            'Running a GraphQL API server at http://localhost:4000/project'
          );
        });
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }
}

export default GraphQLServer;
