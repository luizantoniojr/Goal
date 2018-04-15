import numeral from "numeral";
import ptbr from "numeral/locales/pt-br";
import store from "@/store";

export default function install(Vue) {
    numeral.locale(store.state.culture);
    Vue.prototype.$numeral = numeral;
}






