export const verifySession = (req, res, next) => {    
    if(!req.isAuthenticated()) {        
        return res.redirect('/auth/login');
    }
    return next();
}

export const verifyOfflineSession = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
}