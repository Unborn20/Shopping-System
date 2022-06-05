'use strict'
import Product from "../models/product.js"
import { deleteImage } from "./image.controller.js"

/**
 * @returns List of products
 */
export async function getProducts(){
    try{
        const products = await Product.findAll({
            attributes: [
                'id',
                'name',
                'price',
                'quantity',
                'state',
                'imageProductId'
            ],
            where: { state: true }, 
            order: [['createdAt', 'DESC']], 
            limit: 10 
        })

        if(!products.length) return {
            ok: false,
            status: 202,
            data: { msg: 'Products not found' }
        }

        return {
            ok: true,
            status: 200,
            data: { products }
        }
    }catch(err){
        throw new Error(err)
    }
}

/**
 * @param {*} id 
 * @returns Product
 */
export async function getProductById(id){
    try{
        const product = await Product.findOne({
            attributes: [
                'id',
                'name',
                'price',
                'quantity',
                'state',
                'imageProductId'
            ],
            where: { id }
        })

        if(!product){
            return { data: { msg: 'Product not found' } }
        }

        return { data: { product } }
    }catch(err){
        throw new Error(err)
    }
}

/**
 * 
 * @param {*} productData 
 * @returns Response object
 */
export async function createProduct(productData){
    try{
        const product = new Product(productData)
        await product.save()

        if(!product) return {
            ok: false, 
            status: 400, 
            data: {msg: 'Can\'t register this product'}
        }

        return {
            ok: true,
            status: 200,
            data: {msg: 'Product registered successfully'}
        }
    }catch(err){
        throw new Error(err)
    }
}

/**
 * 
 * @param {*} productData 
 * @param {*} id 
 * @returns Response object
 */
export async function updateProduct(productData, id){
    try{        
        /**
         * Save previous image ID
         */
        const { imageProductId } = await Product.findOne({
            attributes: [                
                'imageProductId'
            ],
            where: { id } 
        })
        
        const product = await Product.update(productData, { where: { id } })               
        if(!product) return {
            ok: false,
            status: 400,
            data: { msg: 'Can\'t update this product' }
        }
        
        if(productData?.imageProductId){
            const imageDeleted = await deleteImage(imageProductId)        
            if(!imageDeleted) return {
                ok: false,
                status: 402,
                data: { msg: 'Can\'t delete the previous image' }
            }
        }
        
        return {
            ok: true,
            status: 200,
            data: { msg: 'Product updated successfully' }
        }
    }catch(error){
        throw new Error('Error has ocurred', error)
    }
}

/**
 * @param {*} id 
 * @returns Response object
 */
export async function changeStateProduct(id){
    try{
        const { state } = await Product.findOne({attributes: ['state'], where: {id}})        
        const product = await Product.update({state: !state}, { where: {id} })

        if(!product) return { 
            ok: false,
            status: 400,
            data: { msg: 'Can\'t change product state'}
        }

        return {
            ok: true,
            status: 200,
            data: { msg: 'Product state chaged successfully'} 
        }
    }catch(err){
        throw new Error(err)
    }
}

/**
 * @param {*} id 
 * @returns List of products
 */
export async function createdProducts(id){
    try{
        const products = await Product.findAll({
            attributes: [
                'id',
                'name',
                'price',
                'quantity',
                'state',
                'imageProductId'
            ],
            where: { userId: id },
            order: [['createdAt', 'DESC']], 
            limit: 10 
        })

        if(!products.length) return {
            ok: false,
            status: 404, 
            data: { msg: 'Products not found' }
        }

        return {
            ok: true,
            status: 200,
            data: { products }
        }
    }catch(err){
        throw new Error(err)
    }
}