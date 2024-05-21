import {Router} from 'express'
import {getVideoController} from './getVideoController'
import {createVideoController} from './createVideoController'
import {findVideoController} from './findVideoController'
import {deleteVideoController} from './deleteVideoController'
import {updateVideoController} from './updateVideoController'
 
export const videosRouter = Router()
 
videosRouter.get('/', getVideoController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideoController)
