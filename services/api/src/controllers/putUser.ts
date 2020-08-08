import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import { BadRequest, NotFound } from 'src/controllers/utils/errors'

const ErrRequestBodyInvalid = 'Invalid request body'
const ErrDocumentNotFound = 'Document not found'

const putUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        const id: string = req.params.id
        const body: any = req.body
        if(!id){
            throw BadRequest(ErrRequestBodyInvalid)
        }
        if(!body || Object.values(body).length === 0){
            throw BadRequest(ErrRequestBodyInvalid)
        }

        const user = await User.findByIdAndUpdate(id, body, {new: true})
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

export default putUser