var router = Ember.Router.map(function(){
  this.route('login');
  this.resource('feeds', function() {
    this.resource('feed', { path: '/:feed_id' });
  });

});

export default router;
