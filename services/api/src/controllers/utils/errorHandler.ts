import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import { GenericError } from 'src/controllers/utils/errors'

const errorHandler = (e: GenericError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Error: ', e.message)

    const response: i.Response = {
        status: e.status,
        success: false,
        message: e.message,
    } 

    res.status(response.status).json(response)
}

export default errorHandler