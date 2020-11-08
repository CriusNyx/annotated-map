import GraphQLServer from './GraphQLServer';
// import GraphQLTestClient from './GrpahQLTestClient';
import MyDatabase from './database/MyDatabase';

async function run() {
  let databaseStatus = await MyDatabase.init();
  console.log(databaseStatus);
  let serverStatus = await new GraphQLServer().run().catch((e) => {
    console.log(e);
  });
  console.log(serverStatus);
  // let clientStatus = await new GraphQLTestClient().run();
  // console.log(clientStatus);
}

run();

export default GraphQLServer;
