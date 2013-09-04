import Resolver from 'resolver';
import Config from 'appkit/config';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_TRANSITIONS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver,
  TTRSS_URL: Config.TTRSS_URL
});

import routes from 'appkit/routes';
App.Router.map(routes); // TODO: just resolve the router

export default App;
