ResetPassword = React.createClass({
  componentDidMount() {
    Modules.client.resetPassword( { form: "#reset-password" } );
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Reset Password</h4>
          <form id="reset-password" className="reset-password" onSubmit={this.handleSubmit}>
            <p className="alert alert-info">To reset your password, enter a new one below. You will be logged in with your new password.</p>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" name="newPassword" className="form-control" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Repeat New Password</label>
              <input type="password" name="repeatNewPassword" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Reset Password &amp; Login" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
