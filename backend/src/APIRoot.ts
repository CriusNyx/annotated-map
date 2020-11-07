import Project from './read/Project';
import ProjectInput from './write/ProjectInput';
import { ProjectInputArgs } from './write/ProjectInput';
import MyDatabase from './database/MyDatabase';

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
