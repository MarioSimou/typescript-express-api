enum StatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
}

interface ErrorInterface {
    status: StatusCodes
    message: string
    stack ?: any
}

export class GenericError implements ErrorInterface {
    private _status: number
    private _message: string

    constructor(message: string, status: StatusCodes){
        this._message = message
        this._status = status
    }

    get status(): number{
        return this._status
    }
    get message(): string {
        return this._message
    }
}

export const BadRequest = (message: string): GenericError => new GenericError(message, StatusCodes.BadRequest)
export const InternalServerError = (message: string): GenericError => new GenericError(message, StatusCodes.InternalServerError)
export const NotFound = (message: string): GenericError => new GenericError(message, StatusCodes.NotFound)
export const Unauthorized = (message: string): GenericError => new GenericError(message, StatusCodes.Unauthorized)