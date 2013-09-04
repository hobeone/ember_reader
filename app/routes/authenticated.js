import ApplicationRoute from 'appkit/routes/application';

var AuthenticatedRoute = ApplicationRoute.extend({
  beforeModel: function(transition) {
    console.log("session id", this.controllerFor('login').get('session_id'));
    if (!this.controllerFor('login').get('session_id')) {
      this.redirectToLogin(transition);
    }
    this._super(this, arguments);
  },

  redirectToLogin: function(transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },
});

export default AuthenticatedRoute;

