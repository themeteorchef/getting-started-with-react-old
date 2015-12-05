injectTapEventPlugin();

Default = React.createClass({

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext(){
		return {
			muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
		}
	},

	render() {
		return (
				<div className="app-root">
					<AppHeader />

					<div className="container">
						{this.props.yield}
					</div>

					<Alert />
				</div>
		);
	}
});
