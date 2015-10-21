let recoverPassword = ( options ) => {
  _validate( options.form );
};

let _validate = ( form ) => {
  $( form ).validate( validation() );
};

let validation = () => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler() { _handleRecovery(); }
  };
};

let _handleRecovery = ( template ) => {
  let email = $( '[name="emailAddress"]' ).val();

  Accounts.forgotPassword( { email: email }, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Check your inbox for a reset link!', 'success' );
    }
  });
};

Modules.client.recoverPassword = recoverPassword;
