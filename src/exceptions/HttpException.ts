class HttpException extends Error {
    constructor(public status: number, public code: number, public message: any, public data?: any) {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
export default HttpException