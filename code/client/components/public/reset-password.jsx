ResetPassword = React.createClass({

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    passwordLengthError: "Your password must be at least 8 characters.",
    passwordMatchError: "Your passwords must match. Try again?"
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
    let token = FlowRouter.current().params.token;

    Accounts.resetPassword( token, data.newPassword, ( error ) => {
      if ( error ) {
        Modules.client.showAlert( error.reason, 'danger' );
      } else {
        Modules.client.showAlert( 'Password reset!', 'success' );
      }
    });
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let { paperStyle, submitStyle } = this.styles;
    let { passwordLengthError, passwordMatchError } = this.errorMessages;

    return (
      <Paper style={paperStyle}>
        <h4>Reset Password</h4>
        <p>To reset your password, enter a new one below. You will be logged in with your new password.</p>

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError} >

          <FormsyText
            name="newPassword"
            type="password"
            required
            floatingLabelText="New Password"
            validations="minLength:8"
            validationError={passwordLengthError} />

          <FormsyText
            name="repeatNewPassword"
            type="password"
            required
            floatingLabelText="Repeat New Password"
            validations="equalsField:newPassword"
            validationError={passwordMatchError} />

          <RaisedButton
            style={submitStyle}
            type="submit"
            label="Reset Password &amp; Login"
            disabled={!this.state.canSubmit} />

        </Formsy.Form>
        <p>Remembered your password? <a href="/login">Log In</a>.</p>
      </Paper>
    );
  }
});
