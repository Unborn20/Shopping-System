'use strict'
import { Router } from 'express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'
import { verifyOfflineSession } from '../middlewares/auth.js'
import { login, register } from '../controllers/user.controller.js'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_GOOGLE_URL
},  async (accessToken, refreshToken, profile, done) => {
    console.info('Google User', accessToken, refreshToken, profile, done)
}))

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
authRoute.post('/login', verifyOfflineSession, async (req, res) => {
    const auth = req.body
    const session = req.session
    const {ok, status, data} = await login(auth)

    if(!ok){
        req.flash("info_msg", data.msg)
        return res.status(status).redirect('/auth/login')
    }

    session.user = data.userVerified    
    return res.status(status).redirect('/')
})

/**
 * Route for Google Authentication
 */
authRoute.get(
    '/login/google/callback',
    passport.authenticate('google', {scope: ['profile']})
)

authRoute.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/')
})

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

    if(!ok){
        req.flash("info_msg", data.msg)
        return res.status(status).redirect('/auth/register')
    }

    req.flash("success_msg", data.msg)
    return res.status(status).redirect('/auth/login')
})

/**
 * Route for logout
 */
authRoute.post('/logout', (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if(err) throw new Error(err)
    })
    res.redirect('/auth/login')
})

export default authRoute