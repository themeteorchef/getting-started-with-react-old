let resetPassword = ( options ) => {
  _validate( options.form );
};

let _validate = ( form ) => {
  $( form ).validate( validation() );
};

let validation = () => {
  return {
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]'
      }
    },
    messages: {
      newPassword: {
        required: "Enter a new password, please.",
        minlength: "Use at least six characters, please."
      },
      repeatNewPassword: {
        required: "Repeat your new password, please.",
        equalTo: "Hmm, your passwords don't match. Try again?"
      }
    },
    submitHandler() { _handleReset(); }
  };
};

let _handleReset = () => {
  var token    = FlowRouter.current().params.token,
      password = $( '[name="newPassword"]' ).val();

  Accounts.resetPassword( token, password, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Password reset!', 'success' );
    }
  });
};

Modules.client.resetPassword = resetPassword;
