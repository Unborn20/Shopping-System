'use strict'
import fs from 'fs'
import path from 'path'
import { v4 } from 'uuid'
import ImageProduct from '../models/image_product.js'

const validExtension = [
    'jpg',
    'jpeg',
    'png',
    'gif'
]
const {pathname: root} = new URL('../src', import.meta.url)

/**
 * 
 * @param {*} param0
 * @param {*} capeta
 * @returns Response object
 */
export function uploadFile({ image }, folder = 'products'){
    return new Promise((resolve, reject) => {
        const nameFile = image.name.split('.')
        const extension = nameFile[nameFile.length - 1]
        const uniqueName = `${v4()}.${extension}`
        const uploadPath = path.join(root, `../uploads/${folder}`, uniqueName)
        const imageUrl = `../uploads/${folder}/${uniqueName}`

        if(!validExtension.includes(extension)){
            reject({
                status: 400,
                msg: `Extension '${extension}' is not valid, valid extensions are: [${validExtension}]`,
                file: null
            })
        }
        
        // Use the mv() method to place the file somewhere on your server
        image.mv(uploadPath, async (error) => {
            if (error) reject({status: 500, error})
            if(fs.existsSync(uploadPath)){
                const imageId = await createImageProduct({imageUrl})
                resolve({
                    status: 200,
                    msg: null,
                    file: {
                        folder,
                        imageId
                    }
                })
            }
        })
    })
}

/**
 * 
 * @param {*} imageProductData
 * @returns Image Product Id
 */
async function createImageProduct(imageProductData){
    const imageProduct = new ImageProduct(imageProductData)
    try{
        await imageProduct.save()
        return imageProduct.id
    }catch(error){
        return new Error('Error has ocurred', error)
    }
}

/**
 * 
 * @param {*} imageId 
 * @returns Response object
 */
export async function getImage(imageId){
    try{
        const { imageUrl } = await ImageProduct.findByPk(imageId)
        return {
            status: 200,
            imageUrl
        }
    }catch(error){
        return new Error('Error has ocurred', error)
    }
}

/**
 * 
 * @param {*} imageId
 * @returns Boolean
 */
export async function deleteImage(id){
    try{
        const { imageUrl } = await ImageProduct.findByPk(id)
        const absolutePath = path.join(root, imageUrl)
        if(fs.existsSync(absolutePath)){
            ImageProduct.destroy({where: { id }})
            fs.unlinkSync(absolutePath)
            return true
        }
        return false
    }catch(error){
        return new Error('Error has ocurred', error)
    }
}