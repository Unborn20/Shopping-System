'use strict'
import { Router } from 'express'
import { verifySession } from '../middlewares/auth.js'
import {
    getProducts,
}
from '../controllers/product.controller.js'

const indexRoute = Router()

/**
 * Render list products
 */
indexRoute.get('/', verifySession, async (req, res) => {
    const { ok, status, data } = await getProducts()

    if(!ok) return res.status(status).render('products/index', { data })

    return res.status(status).render('products/index', { data })
})

export default indexRoute