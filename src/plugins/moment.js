import moment from "moment";

export default function install(Vue) {
  moment['formatterConclusion'] = function (goal) {
    switch (goal.level) {
      case 1:
        return moment(
          goal.conclusion,
          "YYYY-MM-DD"
        ).format("L");
      default:
        return moment(
          goal.conclusion,
          "YYYY-MM"
        ).format("MMMM YYYY");
    }
  }
  return Vue.prototype.$moment = moment
}






