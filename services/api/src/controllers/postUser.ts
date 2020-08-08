import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import { BadRequest } from 'src/controllers/utils/errors'

const ErrRequestBodyInvalid = 'Invalid request body'

const postUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        const body: any = req.body

        if(!body || Object.values(body).length === 0){
            throw BadRequest(ErrRequestBodyInvalid)
        }
        // improve validation with hapi
        const user = await User.create(body)

        const response: i.Response = {
            status: 200,
            success: true,
            data: user
        }
        res.status(response.status).json(response)    
    }catch(e){
        return next(e)
    }
} 

export default postUser