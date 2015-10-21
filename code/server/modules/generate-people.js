let generate = () => {
  let peopleCount = 5,
      peopleExist = _checkIfPeopleExist( peopleCount );

  if ( !peopleExist ) {
    _createPeople( _generatePeople( peopleCount ) );
  }
};

let _checkIfPeopleExist = ( count ) => {
  let peopleCount = People.find().count();
  return peopleCount < count ? false : true;
};

let _createPeople = ( people ) => {
  for ( let i = 0; i < people.length; i++ ) {
    let person = people[ i ];
    _createPerson( person );
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createPerson = ( person ) => {
  People.insert( person );
};

let _generatePeople = ( count ) => {
  let people = [];

  for ( let i = 0; i < count; i++ ) {
    people.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    });
  }

  return people;
};

Modules.server.generatePeople = generate;
