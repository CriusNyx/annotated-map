import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';
import MyDatabase from '../database/MyDatabase';
import AnnotationInput, { AnnotationInputArgs } from './AnnotationInput';

interface NodeInputArgs {
  id: number;
  name?: string;
  parent?: number;
  graphic?: string;
  annotations?: [AnnotationInputArgs];
}

class NodeInput {
  private projectID: number;
  private args: NodeInputArgs;

  constructor(projectID: number, args: NodeInputArgs) {
    this.projectID = projectID;
    this.args = args;
  }

  public async write() {
    await this.writeName();
    await this.writeGraphicName();
    await this.writeParentNode();
    await this.writeAnnotations();
  }

  private async writeName() {
    let { name } = this.args;
    if (name) {
      await this.updateField('NODE_NAME', name);
    }
  }

  private async writeGraphicName() {
    let { graphic } = this.args;
    if (graphic) {
      await this.updateField('GRAPHIC_NAME', graphic);
    }
  }

  private async writeParentNode() {
    let { parent } = this.args;
    if (parent) {
      await this.updateField('PARENT_NODE', parent);
    }
  }

  private async writeAnnotations() {
    let { id, annotations } = this.args;
    let { projectID } = this;
    if (annotations) {
      for (let x of annotations) {
        await new AnnotationInput(projectID, id, x).write();
      }
    }
  }

  private async updateField(field: string, value: any) {
    let projectID = this.projectID;
    let { id } = this.args;

    let sql = `UPDATE NODES SET ${field} = ? WHERE PROJECT_ID = ? AND NODE_ID = ?;`;

    await MyDatabase.database.run(sql, [value, projectID, id]);
  }
}

export default NodeInput;
export { NodeInputArgs };
