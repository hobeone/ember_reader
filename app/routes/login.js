import ApplicationRoute from 'appkit/routes/application';

var LoginRoute = ApplicationRoute.extend({
  setupController: function(controller, context) {
    this._super(this, arguments);
  },
});

export default LoginRoute;
