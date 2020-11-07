import MyDatabase from '../database/MyDatabase';
import Annotation from './Annotation';

class MapNode {
  private projectID: number;
  private nodeID: number;

  constructor(projectID: number, id: number) {
    this.projectID = projectID;
    this.nodeID = id;
  }

  public async id() {
    return this.nodeID;
  }

  public async name() {
    const sql =
      'SELECT NODE_NAME FROM NODES WHERE PROJECT_ID = ? AND NODE_ID = ?';

    let output = await MyDatabase.database.get(sql, [
      this.projectID,
      this.nodeID,
    ]);

    return output.NODE_NAME;
  }

  public async parent() {
    const sql =
      'SELECT PARENT_NODE FROM NODES WHERE PROJECT_ID = ? AND NODE_ID = ?';

    let output = await MyDatabase.database.get(sql, [
      this.projectID,
      this.nodeID,
    ]);

    return output.PARENT_NODE;
  }

  public async graphic() {
    const sql =
      'SELECT GRAPHIC_NAME FROM NODES WHERE PROJECT_ID = ? AND NODE_ID = ?';

    let output = await MyDatabase.database.get(sql, [
      this.projectID,
      this.nodeID,
    ]);

    return output.GRAPHIC_NAME;
  }

  public async annotations() {
    const sql =
      'SELECT ANNOTATION_ID FROM ANNOTATIONS WHERE PROJECT_ID = ? AND NODE_ID = ?';

    let ids = await MyDatabase.database.all(sql, [this.projectID, this.nodeID]);

    return ids.map(
      (x) => new Annotation(this.projectID, this.nodeID, x.ANNOTATION_ID)
    );
  }
}

export default MapNode;
