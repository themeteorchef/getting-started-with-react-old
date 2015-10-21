Default = React.createClass({
	render() {
    return (
      <div className="app-root">
        <AppHeader />
  			<div className="container">
  			  {this.props.yield}
  			</div>
      </div>
		);
	}
});
