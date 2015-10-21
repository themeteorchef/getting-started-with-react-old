const publicRedirect = () => {
  if ( Meteor.userId() ) {
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    ReactLayout.render( Default, { yield: <Signup /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( Default, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    ReactLayout.render( Default, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    ReactLayout.render( Default, { yield: <ResetPassword /> } );
  }
});
