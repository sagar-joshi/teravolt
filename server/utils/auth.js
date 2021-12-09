import passport from 'passport';
import LocalStrategy from 'passport-local';
import {getUser, matchPassword} from '../controllers/user.controller.js';

passport.use(new LocalStrategy.Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done){
        try{
            const user = await getUser(email);
            if(user){
                if(await matchPassword(email, password)){
                    return done(null, user)
                }
            }
            return done(null, false);
        }catch(err){
            return done(err);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user  = await getUser(id);
        delete user.hash;
        done(null, user);
    }catch(err){
        done(err);
    }
});

export function ensureAuthenticated(req, res, next){
    // req.user is set by passport on successful authentication
    if(req.user){
        return next()
    }
    res.status(401).send();
}

export function logout(req, res){
    // passport exposes this logout() on req
    // invoking logout() removes req.user and clears the login session (if any)
    req.logout();
    res.status(200).send();
}