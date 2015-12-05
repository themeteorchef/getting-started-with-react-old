Signup = React.createClass({

  styles: {
    paperStyle: {
      width: 300,
      margin: 20,
      padding: 20
    }
  },

  submitForm(data) {
    let user = {
      email: data.emailAddress,
      password: data.password
    };

    Accounts.createUser( user, ( error ) => {
      if ( error ) {
        Modules.client.showAlert( error.reason, 'danger' );
      } else {
        Modules.client.showAlert( 'Welcome!', 'success' );
      }
    });
  },

  render() {
    let { paperStyle } = this.styles;

    return (
      <Paper style={paperStyle}>
        <h4>Sign Up</h4>
        <LogInSignUpForm label="Sign Up" submit={this.submitForm} />
        <p>Already have an account? <a href="/login">Log In</a>.</p>
      </Paper>
    );
  }
});
