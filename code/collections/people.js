People = new Meteor.Collection( 'people' );

People.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

People.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PeopleSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "The name of the person."
  },
  "email": {
    type: String,
    label: "The email address of the person."
  },
  "avatar": {
    type: String,
    label: "The URL for the avatar of the person."
  }
});

People.attachSchema( PeopleSchema );
