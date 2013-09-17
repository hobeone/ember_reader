import ApplicationController from 'appkit/controllers/application';

var FeedsController = ApplicationController.extend({
  actions: {
    reloadFeeds: function() {
      console.log("Reloading Feeds");
      this.get('model').reload();
    }
  },
  nextFeed: function(prev_feed) {
    console.log("Getting next feed id");
    var prev_index = this.get('model').indexOf(prev_feed);
    if (prev_index > -1) {
      if (prev_index === this.get('model').length) {
        return this.get('model').objectAt(0);
      }
    }
    return this.get('model').objectAt(prev_index + 1);
  },
  feeds_with_items: function() {
    var feeds = this.get('model');
    return feeds.filterProperty('unread');
  }.property('model.@each.unread')
});

export default FeedsController;
