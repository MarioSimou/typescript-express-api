import express from 'express'
import router from 'src/controllers/index'
import mongoose from 'mongoose'
import errorHandler from 'src/controllers/utils/errorHandler'

const port: number= parseInt(<string>process.env.PORT, 10) || 4000
const app: express.Application = express()

app.use(express.json())
app.use('/api/v1', router)
app.use(errorHandler)

;(async () => {
    const dbUri: string = <string>process.env.DB_URI
    const dbOptions: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    await mongoose.connect(dbUri, dbOptions)

    app.listen(port, () => process.stdout.write(`The app listens on port ${port}\n`))
})()

