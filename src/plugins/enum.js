export default function install (Vue) {
        return Vue.prototype.$enum = {
            levels: {
                'short':1,
                'medium':2,
                'long':3
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






