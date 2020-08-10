import express from 'express'
import { UserRole } from 'src/controllers/utils/enums'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'
import Joi from '@hapi/joi'
import * as middlewares from 'src/controllers/utils/middlewares'
import jwt from 'jsonwebtoken'
import { RequestInterface } from 'src/types'

export const UserValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(/.{8}$/),
    role: Joi.string().default(UserRole.Basic).valid(UserRole.Basic, UserRole.Admin)
})

const postUser = async (req: RequestInterface, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.create(req.body)

        const payload = { 
            email: user.email,
            role: user.role,
        }
        const jwtOptions: jwt.SignOptions = {
            expiresIn: '1d'
        }
        const jwtSecret: string = <string>process.env.JWT_SECRET
        const token: string = jwt.sign(payload, jwtSecret, jwtOptions)

        const response: i.Response = {
            status: 201,
            success: true,
            data: {
                user,
                token,
            }
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