var ApplicationRoute = Ember.Route.extend({
  events: {
    logout: function() {
      this.controllerFor('login').logout();
      this.transitionTo('login');
    }
  },

  keyPress: function(key) {
    switch(key.keyCode) {
      case 74:
        console.log("next item");
        this.controllerFor('feed').send('nextItem');
        break;
      case 75:
        console.log("prev item");
        this.controllerFor('feed').send('prevItem');
        break;
      case 111:
        console.log("open item");
        this.controllerFor('feed').send('openItem');
        break;
      case 82:
        console.log("reload feeds");
        this.controllerFor('feeds').send('reloadFeeds');
        break;
      default:
        console.log("application router keypress");
        console.log(key);
    }
  }


});

export default ApplicationRoute;
