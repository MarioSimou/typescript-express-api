import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import { BadRequest, NotFound } from 'src/controllers/utils/errors'

const ErrRequestBodyInvalid = 'Invalid request body'
const ErrDocumentNotFound = 'Document not found'

const getUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        const id: string = req.params.id

        if(!id){
            throw BadRequest(ErrRequestBodyInvalid)
        }
        // improve validation with hapi
        const user = await User.findById(id)

        if(!user){
            throw NotFound(ErrDocumentNotFound)
        }

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

export default getUser