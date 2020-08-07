export default class ServerBase {
    // private variable named "port" and its type must be number
    protected port: number;

    /** 
     * Server's constructor. 
     * It takes a number as parameter.
     * It cannot take any other type else the project won't compile
     */
    constructor(port: number) {
        this.port = port;
    }
}