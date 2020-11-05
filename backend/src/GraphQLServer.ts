import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';

class GraphQLServer {
  constructor() {
    this.run = this.run.bind(this);
    this.generateSchema = this.generateSchema.bind(this);
    this.generateRoot = this.generateRoot.bind(this);
    this.startExpress = this.startExpress.bind(this);
  }

  public async run() {
    let schema = this.generateSchema();
    let root = this.generateRoot();
    return await this.startExpress(schema, root);
  }

  generateSchema() {
    let schema = buildSchema(`
        type Query {
            hello: String
        }
        `);
    return schema;
  }

  generateRoot() {
    let root = {
      hello: () => {
        return 'Hello World!';
      },
    };
    return root;
  }

  async startExpress(schema: GraphQLSchema, root: any) {
    let app = express();
    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
      })
    );
    let promise = new Promise((resolve, reject) => {
      try {
        app.listen(4000, () => {
          resolve(
            'Running a GraphQL API server at http://localhost:4000/graphql'
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
