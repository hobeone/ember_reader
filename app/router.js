var router = Ember.Router.map(function(){
  this.resource('session', function() {
    this.route('new');
    this.route('destroy');
  });

  this.resource('feeds', function() {
    this.resource('feed', { path: '/:feed_id' });
  });

});

export default router;
