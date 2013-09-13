var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('feeds');
  }
});

export default IndexRoute;
