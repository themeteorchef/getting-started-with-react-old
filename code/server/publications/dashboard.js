Meteor.publish( 'dashboard', function() {
  return People.find();
});
