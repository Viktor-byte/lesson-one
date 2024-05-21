import {Request, Response} from 'express'
import { db } from '../db/db'
import { ParamType } from '../input-output-types/video-types'

export const deleteVideoController = (req:Request<ParamType>, res: Response) => {
   
    const videoToDelete = db.videos.find(x => x.id === +req.params.id)
   
    if(videoToDelete) {
        db.videos = db.videos.filter(x => x.id !== +req.params.id)
        res
            .status(204)
            .json({message: 'No Content'})
    } else {
        res
            .status(404)
            .json({message: 'Not Found'})
    }

   
}
