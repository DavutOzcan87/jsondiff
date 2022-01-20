class JsonParseException {
    error: string;
    msg: string;
    constructor(error: string, msg: string) {
        this.error = error;
        this.msg = msg;
    }
}


export { JsonParseException }