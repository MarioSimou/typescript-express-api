import express from 'express'
import * as i from 'src/controllers/utils/interfaces'
import User from 'src/models/User'

const getUsers = async (req: express.Request<any, i.Response>, res: express.Response, next: express.NextFunction) => {
    try {
        // improve validation with hapi
        const users = await User.find()

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

export default getUsers