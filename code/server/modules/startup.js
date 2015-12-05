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

let _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

Modules.server.startup = startup;
