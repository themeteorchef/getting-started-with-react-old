LogInSignUpForm = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    emailError: "Please enter a valid email address",
    passwordLengthError: "Your password must be at least 8 characters."
  },

  styles: {
    submitStyle: {
      marginTop: 20,
      marginBottom: 20
    }
  },

  enableButton() {
    this.setState({
      canSubmit: true
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false
    });
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let { submitStyle } = this.styles;
    let { emailError, passwordLengthError } = this.errorMessages;

    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.props.submit}
        onInvalidSubmit={this.notifyFormError} >

        <FormsyText
          name="emailAddress"
          validations="isEmail"
          validationError={emailError}
          required
          hintText="user@example.com"
          floatingLabelText="Email Address" />

        <FormsyText
          name="password"
          type="password"
          required
          floatingLabelText="Password"
          validations="minLength:8"
          validationError={passwordLengthError} />

        <RaisedButton
          style={submitStyle}
          type="submit"
          label={this.props.label}
          disabled={!this.state.canSubmit} />

      </Formsy.Form>
    );
  }
});
