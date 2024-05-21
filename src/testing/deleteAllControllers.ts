import { Request, Response } from 'express'
import {db} from '../db/db'


export const deleteAllControllers = (req:Request, res: Response) => {
    db.videos = []
    res
        .status(204)
        .json({message: 'All data is deleted'})

    
}