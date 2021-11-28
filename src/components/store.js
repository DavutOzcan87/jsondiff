import { reactive } from 'vue'

const store = {
  debug: true,



  info: reactive({
    text: ""
  }),

  error: reactive({
    texts: []
  }),

  addError(err) {
    this.error.texts.push(err);
  },
  clearErrors() {
    this.error.texts = [];
  },

  onNoDiffFound() {
    this.info.text = "Two documents are identical";
    this.error.texts = [];
  },
  clear() {
    this.info.text = "";
    this.error.texts = [];
  },

  onError(msg) {
    this.info.text = "";
    this.error.texts.push(msg);
    console.log("errros ->", this.error);
  }
}
export default store;