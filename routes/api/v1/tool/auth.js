var express = require('express');
var router = express.Router();
var passport = require('passport');

//test
router.get('/', function(req, res){
    res.json({"msg":"auth test"})
})

//login認証
router.post(
    '/login',
    passport.authenticate('local'),
    function(req,res, next){
        res.json({
            "status":200,
            "message":"ログイン成功",
            "userName":"テストユーザー"
        });
    }
)

module.exports = router;