const Common = require('../../../src/common');
class GetUserInfo extends Common {
    constructor(args) {
        super(args)
    }
    params() {
        return [
            'start',
            'limit'
        ]
    }
    main() {
        return {
            result: [{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            },{
                name:'张三',
                age:'24',
                height:'180',
                weight:'70',
                sex:'1'
            }]
        }
    }
}

module.exports = GetUserInfo;