const http = require('http');
const config = require('./config');

class Common {
    constructor(args) {
        this.config = config;
        if(args) {
            this.req = args.req;
            this.res = args.res;
        }
    }
    onError(errorMsg, detail = '', isString) {
        let result = {
                error: {
                    code:errorMsg.code,
                    message:errorMsg.msg,
                    detail:detail
                }
            }
            if(isString) {
                 return JSON.stringify(result);
            }

            return result
    }
}

module.exports = Common;