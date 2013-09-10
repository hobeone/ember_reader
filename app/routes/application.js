var ApplicationRoute = Ember.Route.extend({
  events: {
    logout: function() {
      this.controllerFor('login').logout();
      this.transitionTo('login');
    }
  },
});

export default ApplicationRoute;
