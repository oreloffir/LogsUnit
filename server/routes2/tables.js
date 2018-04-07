// var express = require('express');
// var router = express.Router();
// var storageManager = require('../managers/storage-manager')
//
// // /**
// //  * This function is a middleware for checking if a user is login
// //  * If not the request will redirect to /login
// //  */
// // var isAuth = function(req, res, next){
// //     if(req.session.user){
// //         next()
// //     }
// //     else
// //         res.redirect('/')
// // };
// //
// // /**
// //  * This routes2 validate any request to the server for login
// //  */
// // router.get('/*', isAuth, function(req, res, next){
// //     next()
// // });
// // router.post('/*', isAuth, function(req, res, next){
// //     next()
// // });
//
// router.get('/', function(req, res, next) {
// 	console.log('Tables page GET request:' + JSON.stringify(req.query["page"]));
//     var query = req.query["query"];
//     var page = parseInt(req.query["page"]);
//     var params = {
//     	start: ((page)-1)*20,
// 		limit: 20
// 	};
//
//     console.log("page: "+page+" params: "+params);
//
// 	storageManager.getLogs(query, params, function (err, logs) {
//         console.log('Tables page GET request params: '+params);
// 		var model = {
// 			logs: logs,
// 			errors: err
// 		};
// 		if(err)
// 			console.log('Tables page GET request failed');
// 		console.log('Table result '+ JSON.stringify(model));
// 		res.json(model);
// 	})
// });
//
// module.exports = router;