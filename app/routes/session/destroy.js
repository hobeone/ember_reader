var SessionDestroyRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    controller.logout();
  }
});

export default SessionDestroyRoute;
