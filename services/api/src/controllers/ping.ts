import express from 'express'
import * as i from './utils/interfaces'

const ping = (req: express.Request, res: express.Response): void => {
    const data: i.Response = {
        status: 200,
        success: true,
        message: 'pong'
    }
    
    res.json(data)
}

export default ping