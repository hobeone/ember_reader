import App from 'appkit/app';
import ApplicationRoute from 'appkit/routes/application';

var AuthenticatedRoute = App.SecretRoute.extend({
/*  beforeModel: function(transition) {
    console.log("auth token", 'AUTHROUTE');
    console.log("auth token", App.Auth.get('authToken'));
    if (!App.Auth.get('authToken')) {
      this.redirectToLogin(transition);
    }
    this._super(this, arguments);
  },

  redirectToLogin: function(transition) {
    //var loginController = this.controllerFor('login');
    //loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },
  */
});

export default AuthenticatedRoute;

