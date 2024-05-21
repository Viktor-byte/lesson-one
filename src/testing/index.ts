import {Router} from 'express'
import {deleteAllControllers} from './deleteAllControllers'

export const testingVideoRouter = Router()

testingVideoRouter.delete('/', deleteAllControllers)