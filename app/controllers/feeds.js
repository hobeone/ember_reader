import ApplicationController from 'appkit/controllers/application';

var FeedsController = ApplicationController.extend({
  actions: {
    reloadFeeds: function() {
      console.log("Reloading Feeds");
      this.get('model').reload();
    }
  }
});

export default FeedsController;
