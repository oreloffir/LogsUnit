var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByEmail = function(username, callback){
    var query = {email: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

/*var UserSchema = new mongoose.Schema({
    displayName: {
        type: String,
        minlength: [5, lang.err_user_display_name_short],
        maxlenght: [15, lang.err_user_display_name_long],
        required:  [true, lang.err_user_display_name_empty],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, lang.err_user_email_empty],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, lang.err_user_email_invalid] ,
        index: true
    },
    imagePath: String,
    hash: {type: String, select: false},
    salt: {type: String, select: false}
});
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
};
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash
};
UserSchema.plugin(uniqueValidator, {message: lang.err_value_taken});

mongoose.model('User', UserSchema);

*/