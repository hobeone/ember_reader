import Resolver from 'resolver';
import Config from 'appkit/config';
import router from 'appkit/router';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_TRANSITIONS: true,
  LOG_BINDINGS: true,
  modulePrefix: 'appkit',
  TTRSS_URL: Config.TTRSS_URL,
  OFFLINE_DEV_MODE: true,
  Resolver: Resolver,
  Router: Ember.Router.extend({
    router: router
  }),
});

function urlX(url) {
  if(/^https?:\/\//.test(url)) {
    return url;
  }
}
function idX(id) {
  return id;
}

Ember.Handlebars.helper('sanitize', function(value, options) {
  var sanitized = window.html_sanitize(value, urlX, idX);
  return new Ember.Handlebars.SafeString(sanitized);
});

Ember.Application.initializer({
  name: 'session',
 
  initialize: function(container, application) {
    App.Session = Ember.Object.extend({
      init: function() {
        this._super();
        this.set('sessionId', window.localStorage['sessionId']);
      },
 
      authTokenChanged: function() {
        window.localStorage['sessionId'] = this.get('sessionId');
      }.observes('sessionId'),
 
    }).create();
  }
});

export default App;
