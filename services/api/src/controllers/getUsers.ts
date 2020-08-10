import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User, {UserInterface} from 'src/models/User'
import { RequestInterface } from 'src/types'
import * as middlewares from 'src/controllers/utils/middlewares'

const getUsers = async (req: RequestInterface, res: express.Response, next: express.NextFunction) => {
    try {
        // improve validation with hapi
        const users: Array<UserInterface> = await User.find()

        const response: i.Response = {
            status: 200,
            success: true,
            data: users
        }
        res.status(response.status).json(response)    
    }catch(e){
        return next(e)
    }
} 

export default middlewares.handleMiddlewares(
    middlewares.validateUserToken,
)(getUsers)