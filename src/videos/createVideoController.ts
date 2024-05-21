import {Request, Response} from 'express'
import {db} from '../db/db'
import {VideoDBType} from '../db/video-db-type'
import { OutputErrorsType } from '../input-output-types/output-error-type'
import { InputVideoType, OutputVideoType} from '../input-output-types/video-types'
import { Resolutions } from '../input-output-types/video-types'



export const InputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    if( typeof video.title !== 'string' || video.title.length > 40){
        errors.errorsMessages.push({
            message: 'error', field: 'title'
        })
    }
    if (typeof video.author !== 'string' || video.author.length > 20){
        errors.errorsMessages.push({
            message: 'error', field: 'author'
        })
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(x => !Resolutions[x])){
        errors.errorsMessages.push({
            message: 'error', field: 'availableResolutions'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = InputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
 
    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),        
    }
    db.videos = [...db.videos, newVideo]
 
    res
        .status(201)
        .json(newVideo)

}