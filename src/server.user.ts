import express from "express";
import User, { IUser } from "./user/user";
import Query from "./user/user.serv";
import ServerBase from "./server.base";

/**
 * Allows to start an Express server (multiple2)
 */
export default class ServerUser extends ServerBase {

    /**
     * Starts the server and does not return anything
     */
    public start(): void {
        const app = express();
        let query = new Query();

        // route for GET /
        // returns items
        app.get('/', async (request: express.Request, response: express.Response) => {
            let data = await query.find({});
            response.send(data);
        });

        app.get('/register', async (request: express.Request, response: express.Response) => {
            let user: IUser = new User();
            let answer = await query.register(user);
            if (answer.result) response.send();
            else response.status(500).send(answer);
        });

        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });

    }

}