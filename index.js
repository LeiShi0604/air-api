var http = require('http');
var express = require('express');
var toolRouter = require('./routes/api/v1/tool/auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app  = express();

//passport設定
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(require('express-session')({
    secret: 'fjaiofjfiafkldsfkadjkafk', //セッションのハッシュ文字列。任意に変更すること。
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//認証ロジック（管理ツールの場合）
passport.use(
	new LocalStrategy(
		{	
			//各filedにjsonのキーを指定
			//passportの仕様上、usernameFieldにemailを入れる
			usernameField: 'email', 
			passwordField: 'password'
		},
		function(username, password, done) {
			//routerのpassport.authenticate()が呼ばれたらここの処理が走る。
			//実際にはDBを参照

			//サンプルユーザー
			if(username == 'testUser@mail' && password == 'password'){
                console.log("ログイン with email :"+username);
                var user = "テストユーザー"
        		return done(null, user);
			}
			//ログイン失敗->401でレスポンスされる
       		return done(null, false, {message:'ID or Passwordが間違っています。'});
		}
	)
);

//認証した際のオブジェクトをシリアライズしてセッションに保存する。
passport.serializeUser(function(username, done) {
	console.log('serializeUser');
	done(null, username);
});


//認証時にシリアライズしてセッションに保存したオブジェクトをデシリアライズする。
//デシリアライズしたオブジェクトは各routerの req.user で参照できる。
passport.deserializeUser(function(username, done) {
	console.log('deserializeUser');
	done(null, {name:username, msg:'my message'});
});
//---------ここまでpassport-----------

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route設定
//テスト
app.get('/test', function(req, res){
    res.json({"msg":"use express"})
})

//運営管理ルート
app.use('/air/api/v1/tool/auth/', toolRouter);


var port = process.env.PORT || 3000;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
