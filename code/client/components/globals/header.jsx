AppHeader = React.createClass({
  brandLink() {
    if ( !Meteor.loggingIn() && !Meteor.userId() ) {
      return FlowRouter.path( 'login' );
    }

    return FlowRouter.path( 'index' );
  },
  navigationItems() {
    if ( !Meteor.loggingIn() && Meteor.user() ) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  },
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.brandLink()}>Base in React</a>
          </div>
          {this.navigationItems()}
        </div>
      </nav>
    );
  }
});
