'use strict'
import path from 'path'
import { Router } from 'express'
import { uploadFile, getImage } from '../controllers/image.controller.js'

const imageRouter = Router()
const {pathname: root} = new URL('../src', import.meta.url)

imageRouter.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }
    
    const {status, msg, file} = await uploadFile(req.files)

    if(status !== 200) return res.status(status).json(msg)
    return res.status(status).json(file)
})

imageRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const { status, imageUrl } = await getImage(id)
    return res.status(status).sendFile(path.join(root, imageUrl))    
})

export default imageRouter