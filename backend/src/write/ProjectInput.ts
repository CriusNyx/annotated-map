import NodeInput from './NodeInput';
import MyDatabase from '../database/MyDatabase';
import { NodeInputArgs } from './NodeInput';

interface ProjectInputArgs {
  id: number;
  name: string;
  nodes?: [NodeInputArgs];
}

class ProjectInput {
  private args: ProjectInputArgs;

  constructor(args: ProjectInputArgs) {
    this.write = this.write.bind(this);
    this.args = args;
  }

  public async write() {
    let { name, nodes } = this.args;

    await this.writeProjectName();
    await this.writeNodes();
  }

  public async writeProjectName() {
    const WRITE_PROJECT_NAME =
      'UPDATE PROJECTS SET PROJECT_NAME = ? where PROJECT_ID = ?';

    let { id, name } = this.args;
    if (name) {
      await MyDatabase.database.run(
        WRITE_PROJECT_NAME,
        this.args.name,
        this.args.id
      );
    }
  }

  public async writeNodes() {
    let { id, nodes } = this.args;
    if (nodes) {
      for (let x of nodes) {
        await new NodeInput(id, x).write();
      }
    }
  }
}

export default ProjectInput;
export { ProjectInputArgs };
