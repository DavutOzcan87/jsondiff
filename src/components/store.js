import { reactive } from 'vue'

const store = {
  debug: true,



  info: reactive({
    text: ""
  }),

  error: reactive({
    objs: []
  }),




  addError(err) {
    this.error.objs.push({
      text: err,
      key: Math.random()
    });
  },
  clearErrors() {
    this.error.objs = [];
  },

  onNoDiffFound() {
    this.info.text = "Two documents are identical";
    this.clearErrors();
  },
  clear() {
    this.info.text = "";
    this.clearErrors();
  },

  onError(msg) {
    this.info.text = "";
    this.addError(msg);
    console.log("errros ->", this.error);
  }
}
export default store;