import { request, gql } from 'graphql-request';

class GraphQLClient {
  constructor() {}

  async run() {
    let query = gql`
      {
        hello
      }
    `;

    return await request('http://127.0.0.1:4000/graphql', query).catch((e) => {
      console.log(e);
    });
  }
}

export default GraphQLClient;
