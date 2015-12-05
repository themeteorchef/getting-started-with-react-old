Login = React.createClass({

  styles: {
    paperStyle: {
      width: 300,
      margin: 20,
      padding: 20
    }
  },

  submitForm(data) {
    Meteor.loginWithPassword( data.emailAddress, data.password, ( error ) => {
      if ( error ) {
        Modules.client.showAlert( error.reason, 'warning' );
      } else {
        Modules.client.showAlert( 'Logged in!', 'success' );
      }
    });
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let {paperStyle } = this.styles;

    return (
      <Paper style={paperStyle}>
        <h4>Log In</h4>
        <LogInSignUpForm label="Log In" submit={this.submitForm} />
        <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
        <a href="/recover-password">Forgot Password?</a>
      </Paper>
    );
  }
});
