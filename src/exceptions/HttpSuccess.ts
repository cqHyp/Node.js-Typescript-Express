class HttpSuccess {
    constructor(public code: number, public message: string, public data: Object) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
export default HttpSuccess;