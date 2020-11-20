import GraphQLServer from './GraphQLServer';
// import GraphQLTestClient from './GrpahQLTestClient';
import MyDatabase from './database/MyDatabase';

async function run() {
  let databaseStatus = await MyDatabase.init();
  console.log(databaseStatus);
  let serverStatus = await new GraphQLServer().run().catch(logError);
  console.log(serverStatus);
}

function logError(e: any) {
  console.log(e);
}

run();

export default GraphQLServer;
