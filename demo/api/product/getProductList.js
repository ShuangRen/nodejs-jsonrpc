const Common = require('../../../src/common');
class GetProductInfo extends Common {
    constructor(args) {
        super(args);
        //this.login = true;
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

module.exports = GetProductInfo;