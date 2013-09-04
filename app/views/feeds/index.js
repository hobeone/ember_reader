var FeedsView = Ember.View.extend({
  templateName: 'feeds',
  keyPress: function(key) {
    switch(key.keyCode) {
    case 30:
      console.log('keyboard shortcut for reloading feeds.');
      break;
    default:
      console.log('Feeds: unhandled keypress');
      console.log(key);
    }
  }
});
export default FeedsView;
