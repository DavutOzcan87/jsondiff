import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    message: 'Hello!',
    messages: {
      errors: ["error 1", "error 2"],
    }
  }),

  setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue)
    }

    this.state.message = newValue
  },

  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered')
    }

    this.state.message = ''
  },

  addError(err) {
    this.state.messages.errors.push(err);
  },
  clearErrors() {
    this.state.messages.errors = [];
  }
}
export default store;