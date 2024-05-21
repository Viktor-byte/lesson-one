import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import { InputVideoType, Resolutions } from '../src/input-output-types/video-types'
import { UpdateVideoType } from '../src/input-output-types/video-types'
 
describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        setDB()
 
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0)
    })

    it('should get not empty array', async () => {
        setDB(dataset1)
 
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
 
        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })

    it('should create new video', async () => {
        setDB()
        const newVideo: InputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144]
        }
    
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)
        
        expect(res.body.title).toEqual(newVideo.title)
        expect(res.body.author).toEqual(newVideo.author)
        expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
    })

    it('shouldn\'t create new video', async () => {
        setDB ()
        const newVideo: InputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolutions: [Resolutions.P144, 'P0' as any]
        }
        const res = await req 
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages[0].field).toBe('availableResolutions')
    })

    it('shouldn\'t find video by id', async () => {
        setDB(dataset1)
    
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/0')
            .expect(404) 
    })

    it('should find video by id', async () => {
        setDB(dataset1)
    
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .expect(200) 

        expect(res.body.id).toBe(dataset1.videos[0].id)
    })

    it('should update video by id', async () => {
        setDB(dataset1)
        const updatedVideo: UpdateVideoType = {
            title: "t0",
            author: "a0",
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-05-19T21:36:20.753Z"
          }

            await req
                    .put(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
                    .send(updatedVideo)
                    .expect(204)

            await req
                    .get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
                    .expect(200, {
                        ...dataset1.videos[0],
                        updatedVideo
                    })
         
    })

    it('shouldn\'t update video by id that no exist', async () => {
        setDB(dataset1)
        const updatedVideo: UpdateVideoType = {
            title: "t0",
            author: "a0",
            availableResolutions: [Resolutions.P144],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-05-19T21:36:20.753Z"
          }

        await req
            .put(SETTINGS.PATH.VIDEOS + '/1')
            .send(updatedVideo)
            .expect(404)
    })

    it('shouldn\'t update video by id', async () => {
        setDB(dataset1)
        const updatedVideo: UpdateVideoType = {
            title: "t0",
            author: "a0",
            availableResolutions: [Resolutions.P144, 'P0' as any],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2024-05-19T21:36:20.753Z"
          }

        const res = await req
            .put(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .send(updatedVideo)
            .expect(400)

            expect(res.body.errorsMessages[0].field).toBe('availableResolutions')
    
        await req
            .get(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .send(updatedVideo)
            .expect(200, dataset1.videos[0])
            
    })
    it('should delete video by id', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/' + dataset1.videos[0].id)
            .expect(204)
    })

    it('shouldn\'t delete video by id', async () => {
        setDB(dataset1)

        const res = await req
            .delete(SETTINGS.PATH.VIDEOS + '/0')
            .expect(404)
    })
   
}) 
