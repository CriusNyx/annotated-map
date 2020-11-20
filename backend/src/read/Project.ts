import MapNode from './MapNode';
import MyDatabase from '../database/MyDatabase';

class Project {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  public async name() {
    const READ_PROJECT_NAME =
      'SELECT PROJECT_NAME FROM PROJECTS WHERE PROJECT_ID = ?';

    let result = await MyDatabase.database.get(READ_PROJECT_NAME, this.id);

    return result['PROJECT_NAME'];
  }

  public async nodes() {
    const sql = 'SELECT NODE_ID FROM NODES WHERE PROJECT_ID = ?';

    let result = await MyDatabase.database.all(sql, [this.id]);

    return result.map((x) => new MapNode(this.id, x.NODE_ID));
  }

  public static async getAllProjectIDs() {
    const sql = 'SELECT PROJECT_ID FROM PROJECTS';

    let result = await MyDatabase.database.all(sql, []);
    return result.map<number>((x) => x.PROJECT_ID);
  }
}

export default Project;
