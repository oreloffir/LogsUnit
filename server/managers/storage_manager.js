var mongoose   		    = require('mongoose');
// import object schema fro mongoDB @see /model
var userSchema 		    = mongoose.model('User');
mongoose.connect('mongodb://localhost/logs_unit');

var storageManager = {
    /**
     * This method is to login a user based on email and password
     * @callback requestCallback
     * @param {String} email - The email for login
     * @param {String} password - The password for login
     * @param {requestCallback} callback - The callback that handles the response (err, user)
     * @see UserSchema for more information
     **/
    login: function (email, password, callback) {
        userSchema.findOne({email: email.toLowerCase()}, ['+hash', '+salt'])
            .exec(function (err, user) {
                if (err)
                    callback(err, null)
                else if (user)
                    if (user.validPassword(password))
                        callback(null, user)
                    else
                        callback(null, null)
                else
                    callback(null, null)

            })
    },
    /**
     * This method will add a new user to the system (Register)
     *
     * @callback requestCallback
     * @param {object} userData - the required fields according to UserSchema
     * @param {requestCallback} callback (err, user)
     */
    addUser: function(userData, callback){
        var user = new userSchema(userData);
        user.setPassword(userData.password);
        user.save(function(err,res){
            callback(err, res);
        })
    },
}

module.exports = storageManager;