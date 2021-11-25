import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    messages: {
      errors: []
    }
  }),

  info: reactive({
    text: ""
  }),

  addError(err) {
    this.state.messages.errors.push(err);
  },
  clearErrors() {
    this.state.messages.errors = [];
  },

  onNoDiffFound() {
    this.info.text = "Two documents are identical";
  }
}
export default store;