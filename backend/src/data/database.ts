import { MongoClient } from 'mongodb';

class Database{
    static url = 'mongodb://localhost/dndDatabase';
    static database;

    // Singleton Implementation
    static instance = null; 

    constructor(){
        this.p_init = this.p_init.bind(this);
    }

    static getInstance(){
        if(Database.instance === null){
            Database.instance = new Database();
        }
        return Database.instance;
    }

    static async init(){
        return await Database.getInstance().p_init();
    }

    async p_init(){
        await MongoClient.connect(Database.url, (err, database) => {
            if(err){
                return err;
            }
            else{
                Database.database = database;
                return null;
            }
        });
        return 'success'
    }
}

export default Database;