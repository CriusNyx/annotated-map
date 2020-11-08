import Project from './read/Project';
import ProjectInput, { ProjectInputArgs } from './write/ProjectInput';
import MyDatabase from './database/MyDatabase';
import { buildSchema } from 'graphql';
import Auth, { LoginType } from './auth/auth';

let apiSchema = buildSchema(`
type Annotation{
  id: Int
  polygon: String
  richText: String
}

input AnnotationInput{
  id: Int
  polygon: String
  richText: String
}

type MapNode{
  id: Int
  name: String
  parent: Int
  graphic: String
  annotations: [Annotation]
}

input MapNodeInput{
  id: Int
  name: String
  parent: Int
  graphic: String
  annotations: [AnnotationInput]
}

type Project{
  id: Int
  name: String
  nodes: [MapNode]
}

input ProjectInput{
  id: Int
  name: String
  nodes: [MapNodeInput]
}

type Query {
  project(id: Int): Project
  login(password: String): String
}

type Mutation{
  write(project: ProjectInput): String
  makeNewProject: Project
  makeNewNode(projectID: Int): MapNode
  makeNewAnnotation(projectID: Int, nodeID: Int): Annotation
}
`);

class APIRoot {
  log(funcName: string, input: any, output: any) {
    console.log(
      `${funcName}(${JSON.stringify(input)}) -> ${JSON.stringify(output)}`
    );
  }

  project(input: { id: number }) {
    let { id } = input;
    let output = new Project(id);
    this.log('project', input, output);
    return output;
  }

  login(input: { password: string }) {
    let { password } = input;
    let loginType = Auth.ValidateLogin(password);
    let output = '';
    switch (loginType) {
      case LoginType.User:
        output = 'User';
        break;
      case LoginType.Admin:
        output = 'Admin';
        break;
      case LoginType.Failed:
        output = 'Failed';
        break;
    }

    this.log('login', input, output);
    return output;
  }

  write(input: { project: ProjectInputArgs }) {
    console.log('write(' + JSON.stringify(input) + ')');
    let { project } = input;
    new ProjectInput(project).write();
    let output = 'success';

    this.log('write', input, output);

    return output;
  }

  async makeNewProject() {
    let input = {};
    let output = await MyDatabase.makeNewProject();

    this.log('makeNewProject', input, output);

    return output;
  }

  async makeNewNode(input: { projectID: number }) {
    let { projectID } = input;
    let output = await MyDatabase.makeNewNode(projectID);

    this.log('makeNewNode', input, output);

    return output;
  }

  async makeNewAnnotation(input: { projectID: number; nodeID: number }) {
    let { projectID, nodeID } = input;
    let output = await MyDatabase.makeNewAnnotation(projectID, nodeID);

    this.log('makeNewAnnotation', input, output);

    return output;
  }
}

export default APIRoot;
export { apiSchema };
