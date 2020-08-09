import express from 'express'
import { UserRole } from 'src/controllers/utils/enums'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import Joi from '@hapi/joi'
import * as middlewares from 'src/controllers/utils/middlewares'

export const UserValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(/.{8}$/),
    role: Joi.string().default(UserRole.Basic).valid(UserRole.Basic, UserRole.Admin)
})

const postUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.create(req.body)

        const response: i.Response = {
            status: 201,
            success: true,
            data: user
        }

        const resourceLocation: string = `${req.url}/${user.id}` 
        res.set({Location: resourceLocation})
        res.status(response.status).json(response)    
    }catch(e){
        return next(e)
    }
} 

export default middlewares.handleMiddlewares(
    middlewares.validateRequestBody(UserValidationSchema),
)(postUser)