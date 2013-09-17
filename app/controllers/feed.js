import ArrayController from 'appkit/controllers/array';

var FeedController = ArrayController.extend({
  needs: 'feeds',
  readItems: [],

  actions: {
    nextItem: function() {
      var remaining = this.get('content').toArray().length;
      console.log("Content length: ", remaining);
      if (remaining > 0) {
        var old_item = this.get('content').shiftObject();
        this.readItems.push(old_item);
        old_item.markRead();
        old_item.get('feed').set('unread', remaining - 1);
        if (remaining === 1){
          var next_feed = this.get('controllers.feeds').nextFeed(old_item.get('feed'));
          this.transitionToRoute('feed', next_feed);
        }
        window.scrollTo(0);
      }
    },
    prevItem: function() {
      if (this.readItems.length > 0) {
        this.get('content').unshiftObject(this.readItems.pop());
        window.scrollTo(0);
      }
    },
    openItem: function() {
      if (this.get('content').objectAt(0)){
        var url = this.get('content').objectAt(0).get('link');
        console.log("opening: ", url);
        window.open(url, '_blank');
      }
    },
    reloadFeed: function() {
      this.get('content').reload();
      window.scrollTo(0);
    }
  }
});

export default FeedController;
