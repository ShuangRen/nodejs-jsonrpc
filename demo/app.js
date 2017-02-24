const NodeRPC = require('../src');
const hostname = '127.0.0.1';
const port = 3000;

const isLogin = require('./api/user/isLogin.js');

const app = new NodeRPC();
      app.run(hostname, port, (req, res, postData, api) => {

            if(api.login == true) {

                  let result = new isLogin().main(req, res);

                  return  result;
            }

            return false;
      });