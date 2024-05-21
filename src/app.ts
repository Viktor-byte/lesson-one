import express from 'express'
import { SETTINGS } from './settings'
import {videosRouter} from './videos/index'
import { testingVideoRouter } from './testing'
import { getVideoController } from './videos/getVideoController'
 
export const app = express()
app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})
app.use(express.json()) 
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingVideoRouter)
app.get(SETTINGS.PATH.VIDEOS, getVideoController)
