import GraphQLServer from './GraphQLServer';
import GraphQLClient from './GrpahQLClient';

async function run() {
  let serverStatus = await new GraphQLServer().run();
  console.log(serverStatus);
  let clientStatus = await new GraphQLClient().run();
  console.log(clientStatus);
}

run();

export default GraphQLServer;
