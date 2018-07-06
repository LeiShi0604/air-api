var http = require('http');
var express = require('express');
var toolRouter = require('./routes/api/v1/tool/auth');
var app  = express();

/*
var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("new instance");

});
*/
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
