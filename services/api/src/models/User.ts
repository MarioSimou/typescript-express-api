import mongoose from 'mongoose'
import { UserRole } from 'src/controllers/utils/enums'

const schemaOptions: mongoose.SchemaOptions = { 
    timestamps: true
} 

const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    role: {
        type: 'string',
        enum: [UserRole.Basic, UserRole.Admin],
        required: true, 
        default: UserRole.Basic,
    },
}, schemaOptions)

export interface UserInterface extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
}

const User: mongoose.Model<UserInterface> = mongoose.model('User', UserSchema)

export default User