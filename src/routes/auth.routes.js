'use strict'
import { Router } from 'express'
import passport from 'passport'
import { verifyOfflineSession } from '../middlewares/auth.js'
import { register } from '../controllers/user.controller.js'
import { passportGoogleConfig, passportLocalConfig } from '../config/passportConfig.js'

passportLocalConfig(passport)
passportGoogleConfig(passport)

const authRoute = Router()

/**
 * Render login page
 */
authRoute.get('/login', verifyOfflineSession, (req, res) => {    
    res.render('auth/login')
})

/**
 * Route for authentication
 */
authRoute.post('/login',
    passport.authenticate('local', { failureRedirect: '/auth/login' }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    })

/**
 * Route for Google Authentication
 */
authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

authRoute.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    }
)

/**
 * Render register page
 */
authRoute.get('/register', verifyOfflineSession, (req, res) => {
    res.render('auth/register')
})

/**
 * Route for register a new user
 */
authRoute.post('/register', verifyOfflineSession, async (req, res) => {
    const user = req.body
    const { ok, status, data } = await register(user)

    if (!ok) {
        req.flash("info_msg", data.msg)
        return res.status(status).redirect('/auth/register')
    }

    req.flash("success_msg", data.msg)
    return res.status(status).redirect('/auth/login')
})

authRoute.post('/previousPage', (req, res) => {
    const currentRoute = req.body.currentRoute
    if(currentRoute === '/auth/login' && req.isAuthenticated()) {
        return res.status(200).json({
            realPath: '/',
            reload: true
        })
    }

    if(currentRoute === '/' && !req.isAuthenticated()) {
        return res.status(200).json({
            realPath: '/auth/login',
            reload: true
        })
    }

    return res.status(200).json({
        realPath: '/auth/login',
        reload: false
    })
})

/**
 * Route for logout
 */
authRoute.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    return res.redirect('/auth/login')
})

export default authRoute