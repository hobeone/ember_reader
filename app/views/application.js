import App from 'appkit/app';

var ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },

  keyPress: function(key) {
    this.get('controller').send('keyPress', key);
  }
});

export default ApplicationView;
