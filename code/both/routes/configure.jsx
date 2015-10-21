FlowRouter.notFound = {
  action() {
    ReactLayout.render( Default, { yield: <NotFound /> } );
  }
};

Accounts.onLogin( () => {
  let currentRoute = FlowRouter.current();
  if ( currentRoute && currentRoute.route.group.name === 'public' ) {
    FlowRouter.go( 'index' );
  }
});

if ( Meteor.isClient ) {
  Tracker.autorun( () => {
    if ( !Meteor.userId() && FlowRouter.current().route ) {
      FlowRouter.go( 'login' );
    }
  });
}
