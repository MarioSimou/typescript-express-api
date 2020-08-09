import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import Joi from '@hapi/joi'
import * as middlewares from 'src/controllers/utils/middlewares'

const requestParamsValidationSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

const getUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.findById(req.params.id)

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
    middlewares.userLookup((req: express.Request) => req.params.id),
)(getUser)