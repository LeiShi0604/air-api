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
    //認証成功
    function(req, res, next){
        res.json({
            "status":200,
            "message":"ログイン成功",
            "userName":req.user
        });
    }
)


//session確認
router.get(
    '/session',
    function(req, res, next){
        if(req.user){
            res.json({
                "status":200,
                "message":"ログイン済み",
                "userName":req.user.name
            });
        }else{
            res.json({
                "status":401,
                "message":"セッションエラー",
                "userName":""
            });
        }
    }
)

//logou認証
router.get(
    '/logout',
    function(req, res, next){
        if(req.user){
            req.logout();
            res.json({
                "status":200,
                "message":"ログアウト成功",
                "userName":""
            });
        }else{
            res.json({
                "status":401,
                "message":"セッションエラー",
                "userName":""
            });
        }
    }
)

module.exports = router;