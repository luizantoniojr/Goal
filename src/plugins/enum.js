export default function install (Vue) {
        return Vue.prototype.$enum = {
            levels: {
                'daily':1,
                'short':2,
                'medium':3,
                'long':4
            },
            getTextValue: function (enumName) {
                var textValueArray = [];
                for(let enumItem in this[enumName]){
                    textValueArray.push({
                        value: this[enumName][enumItem],
                        text: Vue.i18n.translate(enumItem)
                    })
                }
                return textValueArray;
            }
        }
      }






