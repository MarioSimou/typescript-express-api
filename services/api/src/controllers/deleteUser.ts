import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import * as middlewares from 'src/controllers/utils/middlewares'
import Joi from '@hapi/joi'

const requestParamsValidationSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

const deleteUser = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        await User.findByIdAndRemove(req.params.id)
  
        const response: i.Response = {
            status: 204,
            success: true,
        }
        res.status(response.status).json(response)    
    }catch(e){
        return next(e)
    }
} 

export default middlewares.handleMiddlewares(
    middlewares.validateRequestParams(requestParamsValidationSchema),
    middlewares.userLookup((req: express.Request) => req.params.id),
)(deleteUser)