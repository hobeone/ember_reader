import Resolver from 'resolver';
import Config from 'appkit/config';
import routes from 'appkit/routes';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_TRANSITIONS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver,
  TTRSS_URL: Config.TTRSS_URL
});

App.Router.map(routes); // TODO: just resolve the router

App.Auth = Ember.Auth.create({
  requestAdapter: 'jquery',
  responseAdapter: 'json',
  strategyAdapter: 'token',
  baseUrl: Config.TTRSS_URL,
  signInEndPoint: '/',
  signOutEndPoint: '/',

  modules: ['authRedirectable'],
  authRedirectable: {
    route: 'login'
  },
  data: {
    'user': '(user value)',
    'password': '(password value)'
  }
});

App.SecretRoute = Ember.Route.extend(App.Auth.AuthRedirectable);

export default App;
