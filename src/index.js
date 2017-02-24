const http = require('http');
const Common = require('./common');
const Router = require('./router');
const querystring = require("querystring");
const fs = require('fs');

class NodeRPC extends Common {
    constructor() {
        super();
    }

    run(hostname, port, callback) {

        let self = this;

        const server = http.createServer((req, res) => {

            //200请求
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain;charset=utf-8');

            //设置基类的req以及res
            // Common.prototype.req = req;
            // Common.prototype.res = res;

            //实例化路由模块
            const router = new Router({req, res});

            //如果 是一些静态资源的请求
            if(self.config.server.filterRequestReg.test(req.url)) {
                let ContentType = self.getContentType(req.url);
                fs.readFile(__dirname + '/' + self.config.server.path +  req.url,(err,data)=>{
                    if(err) {
                        res.write(JSON.stringify(err));
                        res.end();
                        return;
                    }

                    res.writeHead(200, {"Content-Type": ContentType});
                    res.end(data);
                });

                return;
            }

            //如果非静态资源的请求但是有很多query 或者path
            if(router.getPathName != '/' || router.getQueryString) {

                let result = self.onError(self.config.errorCode[32101], '', true);

                res.write(result);
                res.end();

                return;
            }

            //如果请求方式为get
            if(req.method.toUpperCase() == 'GET') {
                let result = self.onError(self.config.errorCode[32100], '', true);

                res.write(result);
                res.end();

                return;
            }

            let postData = '';

            req.on("error",function(err){
                res.write(JSON.stringify(err));
                res.end();
                return;
            });

            req.addListener("data", function (data) {
                postData +=data;
            });

            req.addListener("end", function () {
                
                postData = JSON.parse(postData);

               self.runRpc(postData, router, req, res, callback);
                
            });
            

            //正常输出res
            //res.end('Hello World\n');
        });

        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }

    getContentType(url) {
        if(/\.html/.test(url)) {
            return "text/html";
        }

        if(/\.css/.test(url)) {
            return "text/css";
        }

        if(/\.js/.test(url)) {
            return "application/javascript";
        }

        if(/\.ico/.test(url)) {
            return "image/x-icon";
        }

        if(/\.jpg/.test(url)) {
            return "image/jpeg";
        }

        if(/\.gif/.test(url)) {
            return "image/gif";
        }

        if(/\.png/.test(url)) {
            return "image/png";
        }
    }

    runRpc(postData, router, req, res, callback) {
        let self = this;
        let isJsonRpc = postData.every((v,i,a)=>{

                if(!v['jsonrpc'] || v['jsonrpc'] != '2.0') return false;

                if(!v['id']) return false;

                if(!v['method']) return false;

                if(!v['params']) return false;

                return true;

            });

        if(!isJsonRpc) {

            let result = self.onError(self.config.errorCode[32600], '', true);
            res.end(result);

            return;
        }

        let returnData = [];

        for(let i=0; i<postData.length; i++) {

            let returnRpc = {
                'jsonrpc': '2.0',
                'id': postData[i]['id']
            }

            let postParams = postData[i]['params'];

            let module;

            let apiUrl = `${postData[i]['method'].replace(/\./, '/').replace(/\_(\w)/g, function(x){return x.slice(1).toUpperCase();})}`;

        
            //动态加载api 并尝试抛错
            try {

                module = require(`${self.config.server.path}/api/${apiUrl}.js`);
            }catch(err) {
                let result = self.onError(self.config.errorCode[32601], `${self.config.server.path}/api/${apiUrl}.js`, true);
                res.end(result);
                return;
            }

            //实例化api
            let api = new module({req, res});
            let result;

            result = callback ? callback(req, res, postData, api) : false; 
            
            if(!result) {

                //验证字段是否存在
                let notParams = [];

                api.params().forEach((v,i,a)=>{
                    if(!postParams[v] && postParams[v] != '0' && postParams[v] != '' && postParams[v] != 0) {
                        console.log('22||22||22')
                        notParams.push(`Field '${v}' is missing and must be uploaded when submitting this field`);
                    }
                });

                if(notParams.length > 0) {
                    result = self.onError(self.config.errorCode[32602], notParams);
                    // res.write(result);
                    // res.end();
                    // break;
                    // return;
                }else {

                    //设置 api 的 路由 属性
                    api.router = router

                    //尝试调用api 实例的 main 方法 并 抛错
                    try {

                        result = api.main(postData[i].params);
                    }catch(err) {

                        result = self.onError(self.config.errorCode[32603]);
                        // res.write(result);
                        // res.end();
                        // break;
                        // return;
                    }

                    if(!result) {
                        result = self.onError(self.config.errorCode[32102]);
                        // res.write(result);
                        // res.end();
                        // break;
                        // return;
                    }

                }
            }

            

            returnData.push(Object.assign({}, returnRpc, result));

            if(i == postData.length - 1) {
                res.write(JSON.stringify(returnData));
                res.end();
                return;  
            }        
        };
    }
    
}

module.exports = NodeRPC;