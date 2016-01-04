AuthenticatedNavigation = React.createClass({
  currentUserEmail() {
    return Meteor.user().emails[0].address;
  },
  logout() {
    return Meteor.logout();
  },  
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className={FlowHelpers.currentRoute( 'index' )}><a href="/">Index</a></li>
          <li className={FlowHelpers.currentRoute( 'dashboard' )}><a href="/dashboard">Dashboard</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.currentUserEmail()} <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li onClick={this.logout}><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
