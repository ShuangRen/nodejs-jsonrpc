const Common = require('../../../src/common');
class GetUserInfo extends Common {
    constructor(args) {
        super(args)
    }
    params() {
        return []
    }
    main() {
        return this.onError(this.config.errorCode[32103], '需要登录');
    }
}

module.exports = GetUserInfo;