var ApplicationController = Ember.Controller.extend({
  needs: ['feed', 'feeds'],

  actions: {
    keyPress: function(key) {
      switch(key.keyCode) {
        case 74:
          console.log("next item");
          this.get('controllers.feed').send('nextItem');
          break;
        case 75:
          console.log("prev item");
          this.get('controllers.feed').send('prevItem');
          break;
        case 111:
          console.log("open item");
          this.get('controllers.feed').send('openItem');
          break;
        case 82:
          console.log("reload feeds");
          this.get('controllers.feeds').send('reloadFeeds');
          break;
        default:
          console.log("application router keypress");
          console.log(key);
      }
    },
  }
});

export default ApplicationController;
