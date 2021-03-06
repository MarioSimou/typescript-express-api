import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import {UserRole} from 'src/controllers/utils/enums'
import User, {UserInterface} from 'src/models/User'
import Joi from '@hapi/joi'
import * as middlewares from 'src/controllers/utils/middlewares'
import { RequestInterface, requestPayload } from 'src/types'

const requestParamsValidationSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

const getUser = async (req: RequestInterface, res: express.Response, next: express.NextFunction) => {
    try {
        const { user } = <requestPayload>req.locals
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
    middlewares.validateUserToken,
    middlewares.userLookup((req: RequestInterface) => req.params.id),
)(getUser)