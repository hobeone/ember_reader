var FeedView = Ember.View.extend({
  templateName: 'feed',
  didInsertElement: function() {
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },

  keyPress: function(key) {
    switch(key.keyCode) {
      case 74:
        console.log("next item");
        this.get('controller').send('nextItem'); 
        break;
      case 75:
        console.log("prev item");
        this.get('controller').send('prevItem'); 
        break;
      case 111:
        console.log("open item");
        this.get('controller').send('openItem'); 
        break;
      default:
        console.log("Unhandled keypress");
        console.log(key);
    }
    var items = $('div.main-content').find('.hero-unit');
  }
});

export default FeedView;
