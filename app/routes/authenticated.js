import App from 'appkit/app';
import ApplicationRoute from 'appkit/routes/application';

var AuthenticatedRoute = ApplicationRoute.extend({
  redirectToLogin: function(transition) {
    App.Session.set('attemptedTransition', transition);
    this.transitionTo('session.new');
  },
 
  beforeModel: function(transition) {
    if (!App.Session.get('session_id')) {
      this.redirectToLogin(transition);
    }
  }
});
export default AuthenticatedRoute;
