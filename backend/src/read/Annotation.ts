import MyDatabase from '../database/MyDatabase';

class Annotation {
  private projectID: number;
  private nodeID: number;
  private annotationID: number;

  constructor(projectID: number, nodeID: number, annotationID: number) {
    this.projectID = projectID;
    this.nodeID = nodeID;
    this.annotationID = annotationID;
  }

  public id() {
    return this.annotationID;
  }

  public async polygon() {
    let sql =
      'SELECT ANNOTATION_POLYGON FROM ANNOTATIONS WHERE PROJECT_ID = ? AND NODE_ID = ? AND ANNOTATION_ID = ?';

    let result = await MyDatabase.database.get(sql, [
      this.projectID,
      this.nodeID,
      this.annotationID,
    ]);

    return result.ANNOTATION_POLYGON;
  }

  public async richText() {
    let sql =
      'SELECT RICH_TEXT FROM ANNOTATIONS WHERE PROJECT_ID = ? AND NODE_ID = ? AND ANNOTATION_ID = ?';

    let result = await MyDatabase.database.get(sql, [
      this.projectID,
      this.nodeID,
      this.annotationID,
    ]);

    return result.RICH_TEXT;
  }
}

export default Annotation;
