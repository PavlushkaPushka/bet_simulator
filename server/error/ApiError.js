class ApiError extends Error {

    constructor(status, message) {

        super(); //that means the class should be expand the Error class
        this.status = status
        this.message = message
    }

    // static function is function which possible without object

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static badData(message) {
        return new ApiError(406, message)
    }

}

module.exports = ApiError