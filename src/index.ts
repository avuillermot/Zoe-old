import ServerItem from "./server.item"
import ServerUser from "./server.user"
import "./config"

// items service
const server0 = new ServerItem(9000);
server0.start();

const server1 = new ServerUser(9001);
server1.start();
