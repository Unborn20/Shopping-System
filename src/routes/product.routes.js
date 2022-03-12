'use strict'
import { Router } from 'express'
import { verifySession } from '../middlewares/auth.js'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    changeStateProduct,
    createdProducts
}
from '../controllers/product.controller.js'

const productRoute = Router()

/**
 * Render list products
 */
productRoute.get('/', verifySession, async (req, res) => {
    const { ok, status, data } = await getProducts()

    if(!ok) return res.status(status).render('products/index', { data })

    return res.status(status).render('products/index', { data })
})

/**
 * Render form for create and edit products
 */
productRoute.get('/form', verifySession, async (req, res) => {
    const id = req.query.id

    if(!!id){
        const { data } = await getProductById(id)
        return res.render('products/create-edit', {
            title: 'Edit',
            id: `${data.product.id}`,
            data 
        })
    }

    return res.render('products/create-edit', {
        title: 'Create',
        id: '',
        data: {}
    })
})

/**
 * Create a new Product
 */
productRoute.post('/', verifySession, async (req, res) => {
    const userId = req.session.user.id
    const state = Boolean(Number(req.body.state))
    const product = {...req.body, userId, state}    
    const { ok, status, data } = await createProduct(product)
    if(!ok){
        req.flash('info_msg', data.msg)
        return res.status(status).redirect({route: '/products/form'})
    }

    req.flash('success_msg', data.msg)
    return res.status(status).json({route: '/products'})
})

/**
 * Edit a product
 */
productRoute.put('/:id', verifySession, async (req, res) => {
    const id = req.params.id
    const state = Boolean(Number(req.body.state))
    const product = {...req.body, state}    
    const { ok, status, data } = await updateProduct(product, id)
    if(!ok){
        req.flash('info_msg', data.msg)
        return res.status(status).redirect({route: '/products/form'})
    }

    req.flash('success_msg', data.msg)
    return res.status(status).json({route: '/products'})
})

/**
 * Change state of a product
 */
productRoute.patch('/:id', verifySession, async (req, res) => {
    console.info(req.params.id)
    // const id = req.params.id
    // const { ok, status, data } = await changeStateProduct(id)
    // const route = `/products/created/${req.session.user.id}`
    // if(!ok){
    //     req.flash('info_msg', data.msg)
    //     return res.status(status).json({route})
    // }
    // req.flash('success_msg', data.msg)
    // return res.status(status).json({route})
})

/**
 * Render list of products by user
 */
productRoute.get('/created/:id', verifySession, async (req, res) => {
    const id = req.params.id
    const { ok, status, data } = await createdProducts(id)

    if(!ok) return res.status(status).render('products/products-by-user', { data })

    return res.status(status).render('products/products-by-user', { data })
})

export default productRoute