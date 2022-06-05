'use strict'
/** 
 * Enviroment variables config
 */
import dotenv from 'dotenv'
dotenv.config()

/**
 * Express instance
 */
import express from 'express'
const app = express()

/**
 * Express body parser
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Method override
 */
import methodOverride from 'method-override'
app.use(methodOverride('_method'))

/**
 * Config helmet
 */
import helmet from 'helmet'
app.use(helmet())
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "script-src": ["'self'", "localhost"],
            "script-src-attr": ["'self'", "localhost"],
            "img-src": ["'self'", "https: data: blob:"]
        },
    })
)

/**
 * Static files
 */
import path from 'path'
const { pathname: root } = new URL('../src', import.meta.url)
app.use('/public', express.static(path.join(root, 'public')))

/**
 * Set up template engine
 */
import expressLayouts from 'express-ejs-layouts'
app.use(expressLayouts)
app.set('view engine', 'ejs')

/**
 * Express session
 */
import session from 'express-session'
import SequelizeSessionInit from 'connect-session-sequelize'
import sequelize from './connection/connection.js'

const SequelizeStore = SequelizeSessionInit(session.Store)
const sequelizeSessionOptions = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 8 * 60 * 60 * 1000
});

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 8 * 60 * 60 * 1000 },
        store: sequelizeSessionOptions
    })
)

sequelizeSessionOptions.sync()

/**
 * Passport config
 */
import passport from 'passport'
app.use(passport.initialize())
app.use(passport.session())

/**
 * Associations models
 */
import './models/associations.js'

/**
 * Flash notifications
 */
import flash from 'connect-flash'
app.use(flash())

/**
 * Middleware for temp directories
 */
import fileUpload from 'express-fileupload'
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

/** 
 * Global Variables
 */
app.use((req, res, next) => {
    res.locals.user = req.user || null
    res.locals.success_msg = req.flash('success_msg')
    res.locals.info_msg = req.flash('info_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

/**
 * Config routes
 */
import indexRoute from './routes/index.routes.js'
app.use('/', indexRoute)

import authRoute from './routes/auth.routes.js'
app.use('/auth', authRoute)

import productRoute from './routes/product.routes.js'
app.use('/products', productRoute)

import imageRouter from './routes/image.routes.js'
app.use('/image', imageRouter)

/**
 * 404 Error
 */
app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

/**
 * 500 Error
 */
app.use((req, res, next) => {
    res.status(500).send('Something broke!');
});

/**
 * Application instance
 */
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.info(`Server Running in Port: ${port}`)
})