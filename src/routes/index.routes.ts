import { Router } from 'express'
import * as express from "express";
import * as path from "path";
import { index } from '../controllers/index.controller'

const router = Router()
router.route('/')
    .get(index);

export default router   