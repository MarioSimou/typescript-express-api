import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import * as middlewares from 'src/controllers/utils/middlewares'
import Joi from '@hapi/joi'
import { UserRole } from 'src/controllers/utils/enums'
import { RequestInterface } from 'src/types'

const requestParamsValidationSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

const requestBodyValidationSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().regex(/.{8}$/),
    role: Joi.valid(UserRole.Admin, UserRole.Basic)
}).or('username', 'email', 'password', 'role')

const putUser = async (req: RequestInterface, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

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

export default middlewares.handleMiddlewares(
    middlewares.validateRequestParams(requestParamsValidationSchema),
    middlewares.validateRequestBody(requestBodyValidationSchema),
    middlewares.validateUserToken,
    middlewares.userLookup((req: RequestInterface) => req.params.id),
)(putUser)