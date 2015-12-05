RecoverPassword = React.createClass({

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    emailError: "Please enter a valid email address"
  },

  styles: {
    paperStyle: {
      width: 300,
      margin: 20,
      padding: 20
    },
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

  submitForm(data) {
    Accounts.forgotPassword( { email: data.emailAddress }, ( error ) => {
      if ( error ) {
        Modules.client.showAlert( error.reason, 'warning' );
      } else {
        Modules.client.showAlert( 'Check your inbox for a reset link!', 'success' );
      }
    });
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let { paperStyle, submitStyle } = this.styles;
    let { emailError } = this.errorMessages;

    return (
      <Paper style={paperStyle}>
        <h4>Recover Password</h4>
        <p>Enter your email address below to receive a link to reset your password.</p>

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError} >

          <FormsyText
            name="emailAddress"
            validations="isEmail"
            validationError={emailError}
            required
            hintText="user@example.com"
            floatingLabelText="Email Address" />

          <RaisedButton
            style={submitStyle}
            type="submit"
            label="Recover Password"
            disabled={!this.state.canSubmit} />

        </Formsy.Form>
        <p>Remembered your password? <a href="/login">Log In</a>.</p>
      </Paper>
    );
  }
});
