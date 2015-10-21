let startup = () => {
  _setBrowserPolicies();
  _generateAccounts();
  _generatePeople();
  _setEnvironmentVariables();
};

let _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll( '*.amazonaws.com' );
};

let _generateAccounts = () => Modules.server.generateAccounts();

let _generatePeople = () => Modules.server.generatePeople();

let _setEnvironmentVariables = () => {
  process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
};

Modules.server.startup = startup;
