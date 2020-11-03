import Auth from './Auth';

class Server{
    constructor(){
        this.start = this.start.bind(this);
    }

    start(){
        let express = require('express');
        let app = express();

        Auth.bindEndpoints(app);

        app.listen(3001, () => {
            console.log('App is listening on port 3001!');
        });
    }
}

export default Server;