import express from 'express'
import { UserInterface } from 'src/models/User'

export interface jwtPayloadInterface {
    email: string,
    role: string,
    iat: number,
    exp: number
}

export interface requestPayload {
    user: UserInterface
    jwtPayload: jwtPayloadInterface
}

export interface RequestInterface extends express.Request {
    locals?: requestPayload
}