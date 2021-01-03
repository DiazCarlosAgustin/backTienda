import express from 'express';
import { createConnection } from 'typeorm'
import cors = require('cors');
import 'reflect-metadata'
import multer from 'multer'
import path from 'path'

// routes
import indexRouter from './routes/index.routes'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'

export class App {
    app: express.Application

    constructor(private port?: number | string) {
        this.app = express()
        this.settings();
        this.middleware();
        this.routes();
        createConnection()
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middleware() {
        const storage = multer.diskStorage({
            destination: path.join(__dirname, 'public/img'),
        })

        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(multer({
            storage,
            dest: path.join(__dirname, 'public/img'),
        }).single('image'))
    }

    routes() {
        this.app.use(indexRouter)
        this.app.use('/user/', userRouter)
        this.app.use('/auth/', authRouter)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log("server on port ", this.app.get('port'))
    }
}