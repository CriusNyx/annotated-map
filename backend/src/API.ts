import Project from './read/Project';
import ProjectInput, { ProjectInputArgs } from './write/ProjectInput';
import MyDatabase from './database/MyDatabase';
import { buildSchema } from 'graphql';
import Authentication, { Auth, LoginType } from './auth/auth';

let apiSchema = buildSchema(`

input Auth{
  password: String
}

enum LoginType{
  User
  Admin
  Failed
}

type AuthResponse{
  loginType: LoginType
}

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
  allProjects(auth: Auth): [Project]
  project(id: Int, auth: Auth): Project
  login(auth: Auth): AuthResponse
}

type Mutation{
  write(project: ProjectInput, auth: Auth): String
  makeNewProject(auth: Auth): Project
  makeNewNode(projectID: Int, auth: Auth): MapNode
  makeNewAnnotation(projectID: Int, nodeID: Int, auth: Auth): Annotation
}
`);

class APIRoot {
  log(funcName: string, input: any, output: any) {
    console.log(
      `${funcName}(${JSON.stringify(input)}) -> ${JSON.stringify(output)}`
    );
  }

  async allProjects(input: { auth: Auth }) {
    let ids = await Project.getAllProjectIDs();
    let output = ids.map((x) => new Project(x));
    this.log('allProjects', input, {});
    return output;
  }

  project(input: { id: number; auth: Auth }) {
    let { id } = input;
    let output = new Project(id);
    this.log('project', input, output);
    return output;
  }

  login(input: { auth: { password: string } }) {
    console.log(JSON.stringify(input));
    let { auth } = input;
    let loginType = Authentication.ValidateLogin(auth);
    let output = { loginType };

    this.log('login', input, output);
    return output;
  }

  write(input: { project: ProjectInputArgs; auth: Auth }) {
    console.log('write(' + JSON.stringify(input) + ')');
    let { project } = input;
    new ProjectInput(project).write();
    let output = 'success';

    this.log('write', input, output);

    return output;
  }

  async makeNewProject(input: { auth: Auth }) {
    let output = await MyDatabase.makeNewProject();

    this.log('makeNewProject', input, output);

    return output;
  }

  async makeNewNode(input: { projectID: number; auth: Auth }) {
    let { projectID } = input;
    let output = await MyDatabase.makeNewNode(projectID);

    this.log('makeNewNode', input, output);

    return output;
  }

  async makeNewAnnotation(input: {
    projectID: number;
    nodeID: number;
    auth: Auth;
  }) {
    let { projectID, nodeID } = input;
    let output = await MyDatabase.makeNewAnnotation(projectID, nodeID);

    this.log('makeNewAnnotation', input, output);

    return output;
  }
}

export default APIRoot;
export { apiSchema };
