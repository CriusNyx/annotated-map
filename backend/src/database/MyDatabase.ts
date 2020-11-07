import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import Project from '../read/Project';
import ProjectInput from '../write/ProjectInput';
import MapNode from '../read/MapNode';
import Annotation from '../read/Annotation';

class MyDatabase {
  public static database: Database<sqlite3.Database, sqlite3.Statement>;

  public static async init() {
    return await this.connect()
      .then((x) => {
        this.database = x;

        const CREATE_DATABASE_SQL_PATH = 'src/database/CreateDatabase.sql';

        let sql = fs.readFileSync(CREATE_DATABASE_SQL_PATH, 'utf8');
        return this.runSQL(sql);
      })
      .then((x) => {
        return 'Database Connected';
      })
      .catch((x) => {
        return 'database connection failed ' + JSON.stringify(x);
      });
  }

  private static async connect() {
    return open({ filename: 'database.db', driver: sqlite3.Database });
  }

  private static async runSQL(sql: string) {
    await this.database.exec(sql);
  }

  public static async makeNewProject() {
    let id = await this.getNextID();

    this.writeProjectID(id);

    return new Project(id);
  }

  private static async getNextID() {
    const GET_MAX_PROJECT_ID = 'SELECT MAX(PROJECT_ID) FROM PROJECTS;';

    let result = await this.database.get(GET_MAX_PROJECT_ID);
    let id = result['MAX(PROJECT_ID)'];

    if (id === null) {
      id = 0;
    } else {
      id = id + 1;
    }

    return id;
  }

  private static async writeProjectID(id: number) {
    const WRITE_PROJECT_ID =
      'INSERT OR REPLACE INTO PROJECTS(PROJECT_ID) VALUES(?)';

    return await this.database.run(WRITE_PROJECT_ID, id);
  }

  public static async makeNewNode(projectID: number) {
    let id = await this.getNextNodeID(projectID);
    await this.insertNewNode(projectID, id);
    return new MapNode(projectID, id);
  }

  private static async getNextNodeID(projectID: number) {
    const GET_NEXT_NODE_ID =
      'SELECT MAX(NODE_ID) FROM NODES WHERE PROJECT_ID = ?';

    let result = await this.database.get(GET_NEXT_NODE_ID, projectID);
    let id = result['MAX(NODE_ID)'];
    if (id === null) {
      id = 0;
    } else {
      id = id + 1;
    }

    return id;
  }

  private static async insertNewNode(projectID: number, nodeID: number) {
    const INSERT_NEW_NODE =
      'INSERT OR REPLACE INTO NODES(PROJECT_ID, NODE_ID) VALUES(?, ?)';

    await this.database.run(INSERT_NEW_NODE, [projectID, nodeID]);
  }

  public static async makeNewAnnotation(projectID: number, nodeID: number) {
    let annotationID = await this.getNewAnnotationID(projectID, nodeID);
    await this.insertNewAnnotation(projectID, nodeID, annotationID);
    return new Annotation(projectID, nodeID, annotationID);
  }

  private static async getNewAnnotationID(projectID: number, nodeID: number) {
    const sql =
      'SELECT MAX(ANNOTATION_ID) FROM ANNOTATIONS WHERE PROJECT_ID = ? AND NODE_ID = ?';

    let result = await this.database.get(sql, [projectID, nodeID]);

    let id = result['MAX(ANNOTATION_ID)'];
    if (id == null) {
      id = 0;
    } else {
      id = id + 1;
    }

    return id;
  }

  private static async insertNewAnnotation(
    projectID: number,
    nodeID: number,
    annotationID: number
  ) {
    const sql =
      'INSERT INTO ANNOTATIONS(PROJECT_ID, NODE_ID, ANNOTATION_ID) VALUES(?, ?, ?)';

    this.database.run(sql, [projectID, nodeID, annotationID]);
  }
}

export default MyDatabase;
