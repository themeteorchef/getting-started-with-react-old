Alert = React.createClass({

  getInitialState() {
    return {
      snackbarMessage: "",
      snackbarColor: "#000"
    };
  },

  componentDidMount() {
    Modules.client.showAlert = this.showAlert;
  },

  styles: {
    alert: {
      successColor: "#4CAF50",
      infoColor:    "#03a9f4",
      warningColor: "#FB8C00",
      dangerColor:  "#F44336",
      defaultColor: "#000000"
    }
  },

  showAlert(message, type){
    let { successColor, infoColor, warningColor, dangerColor, defaultColor } = this.styles.alert;

    switch (type) {
      case "success":
        this.setState( {snackbarColor: successColor});
        break;
      case "info":
        this.setState( {snackbarColor: infoColor});
        break;
      case "warning":
        this.setState( {snackbarColor: warningColor});
        break;
      case "danger":
        this.setState( {snackbarColor: dangerColor});
        break;
      default:
        this.setState( {snackbarColor: defaultColor});
    }

    this.setState( {snackbarMessage: message});

    this.refs.snackbar.show();
  },

  render() {
    let { snackbarMessage, snackbarColor } = this.state;

    return (
      <Snackbar
        ref="snackbar"
        message={snackbarMessage}
        bodyStyle={{backgroundColor: snackbarColor}}
        autoHideDuration={4000} />
    )
  }
});
