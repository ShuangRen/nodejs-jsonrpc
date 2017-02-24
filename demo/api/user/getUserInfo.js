const Common = require('../../../src/common');
class GetUserInfo extends Common {
    constructor(args) {
        super(args);
        this.login = true;
    }
    params() {
        return [
            'uid'
        ]
    }
    main() {
        return {
            result: {
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            }
        }
    }
}

module.exports = GetUserInfo;