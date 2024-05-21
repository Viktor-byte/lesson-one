import { Request, Response } from 'express'
import { OutputVideoType } from '../input-output-types/video-types'
import { db } from '../db/db';
import { ParamType } from '../input-output-types/video-types';


export const  findVideoController = (req: Request<ParamType> , res: Response<OutputVideoType | {}>) => {
    const foundVideo = db.videos.find(c => c.id === +req.params.id)

  if(!foundVideo) {
    res
        .status(404)
        .json({message: 'not found'})
    return;
  }
    res
        .status(200)
        .json(foundVideo)
}