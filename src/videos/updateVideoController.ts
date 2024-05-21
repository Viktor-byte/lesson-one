import { Request, Response } from "express";
import { db } from "../db/db";
import { ParamType } from "../input-output-types/video-types";
import { InputVideoType } from "../input-output-types/video-types";
import { InputValidation } from "./createVideoController";



export const updateVideoController = (req: Request<ParamType, InputVideoType>, res: Response) => {
    const errors = InputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    const videoToUdate = db.videos.find(x => x.id === +req.params.id)
    if(videoToUdate) {
        videoToUdate.title = req.body.title
        videoToUdate.author = req.body.author
        videoToUdate.availableResolutions = req.body.availableResolutions
        videoToUdate.canBeDownloaded = req.body.canBeDownloaded
        videoToUdate.minAgeRestriction = req.body.minAgeRestriction
        videoToUdate.publicationDate = req.body.publicationDate
        res
            .status(204)

    }
   
    res
        .status(404)
        .json({message: 'Not Found'})
    

}
