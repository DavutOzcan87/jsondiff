import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    messages: {
      errors: []
    }
  }),

  infoMessage: reactive({
    message: {
      value: ""
    }
  }),

  addError(err) {
    this.state.messages.errors.push(err);
  },
  clearErrors() {
    this.state.messages.errors = [];
  },

  onNoDiffFound() {
    this.infoMessage.message.value = "Two documents are identical";
    this.state.messages.errors.push("errr1");
    console.log("onNoDiffFound", "state", this.state, this.infoMessage.message);
  }
}
export default store;