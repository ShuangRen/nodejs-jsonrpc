# JSONRPC for NodeJs

## start

```javascript
//require noderpc
const NodeRPC = require('../src');
// setting host and port
const hostname = '127.0.0.1';
const port = 3000;
//instantiation the app
const app = new NodeRPC();
      
      //run in host and prot
      app.run(hostname, port);
```

## write Api

> we appoint the  api folder name is "api"

>demo

```javascript
--demo
    --api  //api folder
        --user
            --getUserInfo.js //api
        --product
--noderpc
    --index.js
    --xx
```
## api format

```javascript
//require common class
const Common = require('../../../src/common');

//define api class
class GetUserInfo extends Common {

    // extends base class args
    constructor(args) {
        super(args)

        //can write other attribute
        this.name = 'abc';
    }
    //api pass parameter
    params() {
        return ['uid', 'acid']  //js ajax must pass uid acid 
    }

    //main method
    main() {

        //do something 

        //return  result
        return {
            result: {
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            }
        };
    }
}

//cmd module return
module.exports = GetUserInfo;
```

## api retrun error

> you can use onError() method

```javascript
main() {

    //do something 

    //return  error
    return this.onError(this.config.errorCode[32103], 'the api need login','need login');

    /*
     error: {
        code:32103,
        message:'need login',
        detail:'the api need login',
     }
    */

}
```

## api auto error

> the jsonrpc framework can return all error;

```javascript
module.exports = {
    32100:{
        code: 32100,
        msg: 'application does not support GET'
    },
    32101: {
        code: 32101,
        msg: 'invalid queryString in request'
    },
    32102: {
        code: 32102,
        msg: 'the request api is not return'
    },
    32103: {
        code: 32103,
        msg: 'is not login'
    },
    32601: {
        code: 32601,
        msg: 'the request api is not define'
    },
    32602: {
         code: 32602,
         msg: 'missing fields in the params'
    },
    32603: {
        code: 32603,
        msg: 'the request api must define main method'
    },
    32600: {
        code: 32600,
        msg: 'the request is not jsonrpc'
    }
}
```
> atuo return error  example

```javascript
{
    "jsonrpc": "2.0","id":"2.dfas1223s21232fdasdsad63da",
    "error": {
        "code":32602,
        "message":"missing fields in the params",
        "detail":[
            "Field 'start' is missing and must be uploaded when submitting this field",
            "Field 'limit' is missing and must be uploaded when submitting this field"
         ]
     }
}
```

## common at run
> you can do something in run callback

```javascript
const isLogin = require('./api/user/isLogin.js');

// check login in all apis

//callback arguments by req, res, postdata, api
app.run(hostname, port, (req, res, postData, api) => {

        if(api.login == true) {

                let result = new isLogin().main(req, res);

                return  result;
        }

        return false;
});
```

## config
```javascript
//errorCode.config

//configure some error code
module.exports = {
    32100:{
        code: 32100,
        msg: 'application does not support GET'
    },
}

//server.config

//configure some server info
module.exports = {
    //now protocol
    protocol:'http', 

    //now filterRequestReg
    filterRequestReg: /favicon.ico|.js|.img|.css|.html|.json|.mp4|.mp3|.htm|.xhtml/,

    //your project relative path
    path: '../demo'
}

//and you can write other in yourself 

//but must join in index.js
```

## run demo
```base
cd demo
node app.js
```

> Open with browser by http://127.0.0.1/index.html

>You can see a Ajax jsonrpc message

```javascript
[
    {
        jsonrpc: "2.0", 
        id: "2.02132132132132132131312", 
        method: "user.get_user_info", 
        params: {"uid": 20}
    }
    {
        jsonrpc: "2.0", 
        id: "2.21232fdasdsad63dfas1223sda", 
        method: "user.get_user_list",
        params: {"start": 0, "limit": 20}
    }
    {
        jsonrpc: "2.0", 
        id: "2.dfas1223s21232fdasdsad63da", 
        method: "product.get_product_info",
        params: {"pid": 20}
    }
    {
        jsonrpc: "2.0", 
        id: "2.dfas1223s21232fdasdsad63da", 
        method: "product.get_product_list", 
        params: {}
    }
]
```
>You can see the return of information are simulated not logged in, return to the list, the lack of field data, returns a single, return to the list

```javascript
[
    {
        "jsonrpc":"2.0",
        "id":"2.02132132132132132131312",
        "error":{
            "code":32103,
            "message":"is not login",
            "detail":"需要登录"
            }
    },
    {
        "jsonrpc":"2.0",
        "id":"2.21232fdasdsad63dfas1223sda",
        "result":[
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"},
            {"name":"张三","age":"24","height":"180","weight":"70","sex":"1"}
            ]
    },
    {
        "jsonrpc":"2.0",
        "id":"2.dfas1223s21232fdasdsad63da",
        "result":{
            "name":"car",
            "age":"24",
            "height":"180",
            "weight":"70",
            "sex":"1"
        }
    },
    {
        "jsonrpc":"2.0",
        "id":"2.dfas1223s21232fdasdsad63da",
        "error":{
            "code":32602,
            "message":"missing fields in the params",
            "detail":[
                "Field 'start' is missing and must be uploaded when submitting this field","Field 'limit' is missing and must be uploaded when submitting this field"
            ]
        }
    }
]
```