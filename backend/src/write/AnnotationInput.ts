import MyDatabase from '../database/MyDatabase';

interface AnnotationInputArgs {
  id: number;
  polygon?: string;
  richText?: string;
}

class AnnotationInput {
  private projectID: number;
  private nodeID: number;
  private args: AnnotationInputArgs;

  constructor(projectID: number, nodeID: number, args: AnnotationInputArgs) {
    this.projectID = projectID;
    this.nodeID = nodeID;
    this.args = args;
  }

  public async write() {
    await this.writePolygon();
    await this.writeRichText();
  }

  private async writePolygon() {
    let { polygon } = this.args;
    if (polygon) {
      await this.writeField('ANNOTATION_POLYGON', polygon);
    }
  }

  private async writeRichText() {
    let { richText } = this.args;
    if (richText) {
      await this.writeField('RICH_TEXT', richText);
    }
  }

  private async writeField(field: string, value: any) {
    let { projectID, nodeID } = this;
    let { id } = this.args;

    let sql = `UPDATE ANNOTATIONS SET ${field} = ? WHERE PROJECT_ID = ? AND NODE_ID = ? AND ANNOTATION_ID = ?`;

    await MyDatabase.database.run(sql, [value, projectID, nodeID, id]);
  }
}

export default AnnotationInput;
export { AnnotationInputArgs };
