export const verifySession = (req, res, next) => {
    const session = req.session;
    if(!session.user){        
        return res.redirect('/auth/login');
    }
    return next();
}

export const verifyOfflineSession = (req, res, next) => {    
    const session = req.session;    
    if(session.user !== undefined){
        return res.redirect('/');
    }
    return next();
}