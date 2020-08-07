import express from "express";
import Query from "./item/item.serv";
import ServerBase from "./server.base";

/**
 * Allows to start an Express server
 */
export default class ServerItem extends ServerBase {

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

        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });

    }

}