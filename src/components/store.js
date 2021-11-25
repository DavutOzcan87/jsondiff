import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    messages: {
      errors: [],
      persistentInfo: "test"
    }
  }),

  addError(err) {
    this.state.messages.errors.push(err);
  },
  clearErrors() {
    this.state.messages.errors = [];
  },

  onNoDiffFound() {
    this.state.messages.persistentInfo = "Two documents are identicall.";
    //this.state.messages.errors.push("errr1");
    console.log("onNoDiffFound", "state", this.state);
  }
}
export default store;