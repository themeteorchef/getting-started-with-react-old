Dashboard = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let subscription = Meteor.subscribe( 'dashboard' );

    return {
      isLoading: !subscription.ready(),
      people: People.find().fetch()
    };
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <PeopleTable people={this.data.people} />
      );
    }
  }
});
