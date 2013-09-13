import ArrayController from 'appkit/controllers/array';

var FeedController = ArrayController.extend({
  readItems: [],
  actions: {
    nextItem: function() {
      console.log("Content length: ", this.get('content').toArray().length);
      if (this.get('content').toArray().length > 1) {
        var old_item = this.get('content').shiftObject();
        this.readItems.push(old_item);
        old_item.markRead();
        old_item.get('feed').decrementUnread();
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
      var url = this.get('content').objectAt(0).get('link');
      console.log("opening: ", url);
      window.open(url, '_blank');
    },
    reloadFeed: function() {
      this.get('content').reload();
      window.scrollTo(0);
    }
  }
});

export default FeedController;
