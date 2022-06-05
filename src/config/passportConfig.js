import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user.js'
import { login, googleLogin } from '../controllers/user.controller.js'

/**
 * PASSPORT LOCAL STRATEGY CONFIGURATION
 * @param {*} passportInstance 
 */
export const passportLocalConfig = (passportInstance) => {
    passportInstance.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (request, email, password, done) => {
        const { ok, data } = await login({ email, password })

        if (!ok) {
            done(null, false, request.flash('info_msg', data.msg))
        }

        done(null, data.userVerified)
    }))

    passportInstance.serializeUser(async (user, done) => {
        done(null, user.id);
    });

    passportInstance.deserializeUser(async (id, done) => {
        const user = await User.findOne({ attributes: ['id', 'name', 'roleId'], where: { id } })
        done(null, user)
    });
}

/**
 * PASSPORT GOOGLE STRATEGY CONFIGURATION
 * @param {*} passportInstance 
 */
export const passportGoogleConfig = (passportInstance) => {
    passportInstance.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_GOOGLE_URL,
    }, async (accessToken, refreshToken, profile, done) => {
        const user = await googleLogin(profile)        
        done(null, user)
    }))

    passportInstance.serializeUser(function (user, done) {
        done(null, user.googleId);
    })

    passportInstance.deserializeUser(async (id, done) => {
        const user = await User.findOne({ attributes: ['id', 'name', 'googleId', 'roleId'], where: { googleId: id } })
        done(null, user)
    });
}
