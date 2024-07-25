class Apierror extends Error {
    constructor(statusCode, message, suceess = false, stack) {
        super(message)
        this.statusCode = statusCode

    }
}

export {Apierror}