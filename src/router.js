const url = require("url"); 
const queryString  = require("querystring");

const Common  = require("./common.js");

class Router extends Common {
    constructor(args) {
        super(args);
        this.href = `${this.config.server.protocol}://${this.req.headers.host}${this.req.url}`;

        this.parser = url.parse(this.href, true);

        this.getQueryString = this.parser.search.replace(/\?/, '');

        this.getPathName = this.parser.pathname;

        this.hash = this.parser.hash;

        this.protocol = this.parser.protocol;

        this.root = this.parser.root;
    }
    getQuery(str) {
        if(str) {
            return this.parser.query[str];
        }

        return this.parser.query;
    }

}

module.exports = Router;