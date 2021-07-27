import express from 'express';
import { createConnection } from 'typeorm'
import cors = require('cors');
import 'reflect-metadata'
import path from 'path'

// import multer from 'multer'

// routes
import indexRouter from './routes/index.routes'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import categoriaRouter from './routes/categorias.routes'

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
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, '/public')));
    }

    routes() {
        this.app.use(indexRouter)
        this.app.use('/user/', userRouter)
        this.app.use('/auth/', authRouter)
        this.app.use('/categoria/', categoriaRouter)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log("server on port ", this.app.get('port'))
    }
}