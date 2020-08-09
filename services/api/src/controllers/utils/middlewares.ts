import express from 'express'
import { BadRequest, NotFound } from 'src/controllers/utils/errors'
import User from 'src/models/User'
import Joi from '@hapi/joi'

type middlewareHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => void
type middlewareHandlers = Array<middlewareHandler>

export const handleMiddlewares = (...middlewares: middlewareHandlers) => (fn: express.Handler) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        for(const middleware of middlewares){
            await middleware(req,res,next)
        }
        
        return fn(req,res,next)
    }catch(e){
        return next(e)
    }
}

export const validateRequestBody = (schema: Joi.Schema) => (req: express.Request, res: express.Response, next: express.NextFunction) => {   
    const {error}: Joi.ValidationResult = schema.validate(req.body)

    if(error){
        const [validationErrorItem]: Array<Joi.ValidationErrorItem> = error.details
        throw BadRequest(validationErrorItem.message)
    }
}

export const validateRequestParams = (Schema: Joi.Schema) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {error} : Joi.ValidationResult = Schema.validate(req.params)

    if(error){
        const [validationErrorItem]: Array<Joi.ValidationErrorItem> = error.details
        throw BadRequest(validationErrorItem.message)
    }
}

export const userLookup = (getLookupId: Function ) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await User.findById(getLookupId(req))
    if(!user){
        throw NotFound('User not found')
    }
}