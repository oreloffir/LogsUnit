var express         = require('express');
var router          = express.Router();
var lang            = require('../lang/en');
var storageManager  = require('../managers/storage_manager');


/**
 * This function is a middleware for checking if a user is login
 * If not the request will redirect to /login
 */
var isAuth = function(req, res, next){
    if(req.session.user){
        next()
    }
    else
        res.redirect('/login')
};


router.get('/signup', function(req, res, next){
    res.render('signup', {title: "LogsUnit signup"});
});
/**
 * This route is for sighup post request
 * @see storage_manager.addUser
 */
router.post('/signup', function(req, res, next){
    console.log("Sign up req: " + JSON.stringify(req.body));
    var model = { title: "LogsUnit signup", errors: [] };
    validateSignupInput(req, function(errArray , req){
        if(errArray){
            model.errors = errArray;
            res.render('signup', model);
        }else{
            // get the userData from the form
            var userData = req.body;
            storageManager.addUser(userData, function(err, callback){
                if (err) {
                    console.log('Error Inserting New Data');
                    console.log('Error: '+err);
                    if (err.name === 'ValidationError')
                        for (field in err.errors){
                            model.errors.push(err.errors[field].message);
                        }
                    res.render('signup', model)
                }else{
                    console.log("new user registered");
                    res.redirect('/login')
                }
            })
        }
    })
});


router.get('/login', function(req, res, next){
    res.render('login', {title: "LogsUnit login"});
});
/**
 * This route is for login post request
 * @see storage-manager.login
 */
router.post('/login', function(req, res, next){
    console.log('post request for login');
    storageManager.login(req.body.email, req.body.password, function(err, user){
        if(user){
            // set the user session
            req.session.user = {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
                imagePath: user.imagePath,
                friends: user.friends
            };
            console.log("session user "+ req.session.user.displayName);
            res.redirect('/');
        }
        else{
            var model = {
                title: lang.title_login,
                errors: [lang.err_login_invalid]
            };
            res.render('login', model)
        }
    })
});

/**
 *  GET home page.
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var validateSignupInput = function(req, callback){
    var errArray = [];
    var userData = req.body;
    if(userData.password.length < 5 || userData.password.length > 15)
        errArray.push(lang.err_user_password_invalid);
    if(userData.displayName.length < 5)
        errArray.push(lang.err_user_display_name_short);
    if(userData.displayName.length > 15)
        errArray.push(lang.err_user_display_name_long);

    var regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!regexEmail.test(userData.email))
        errArray.push(lang.err_user_email_invalid);

    if(errArray.length > 0)
        callback(errArray , req)
    else
        callback(null , req)
};


module.exports = router;
