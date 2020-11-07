import { request, gql } from 'graphql-request';

class GraphQLTestClient {
  constructor() {}

  async run() {
    let query = gql`
      {
        project(id: 0) {
          name
          id
        }
      }
    `;

    let newProject = gql`
    {
      makeNewNode(0) { nodeID }
    }
    `;

    let mutation = gql`
      mutation {
        write(project: { id: 0, name: "foo", nodes: [{ id: 1, name: "a" }] })
      }
    `;

    // let a = await request('http://localhost:4000/project', query).catch((e) => {
    //   console.log(e);
    // });
    let a = null;
    // let b = await request('http://localhost:4000/project', mutation).catch((e) => {
    //   console.log(e);
    // });
    let b = null;
    // let c = await request('http://localhost:4000/project', newProject).catch((e) => {
    //   console.log(e);
    // });
    let c = null;
    console.log('read: ' + JSON.stringify(a));
    console.log('write: ' + JSON.stringify(b));
    console.log('makeNewProject: ' + JSON.stringify(c));
    return 'done';
  }
}

export default GraphQLTestClient;
