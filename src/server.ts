import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

class Server {
    private app: express.Application;
    private http: any;
    private router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();
    }

    public start = () => {
        const PORT = process.env.PORT || 8080;

        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

        //  require('./routes/')(this.router);

        this.app.use(this.router);
        this.http = http.createServer(this.app);
        this.http.listen(PORT, () => {
            console.log(`HTTP Listening on ${PORT}...`);
        });
    };
}

new Server().start();
