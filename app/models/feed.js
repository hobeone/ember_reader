import App from 'appkit/app';
import FeedFixtures from 'appkit/models/feed_fixtures';

var Feed = Ember.Model.extend({
  title: Ember.attr(),
  unread: Ember.attr()
});

Feed.adapter = Ember.Adapter.create({
  findAll: function(klass, records) {
    return Ember.$.post(
      App.TTRSS_URL,
      JSON.stringify({
        op:"getFeeds",
        sid:window.localStorage.session_id,
        cat_id:"-4"})
    ).then(
      function(response) {
        var feeds = Em.A();
        console.log("Feed findAll: ", response);
        if (response.content.error) {
          throw "Error: "+response.content.error;
        }
        var filtered = Em.A();
        response.content.forEach(function (child) {
          if (child.unread > 0) {
            filtered.pushObject(child);
          }
        });

        filtered.sort(
          function(a,b) {
            return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
          }
        );
        records.load(klass, filtered);
      }
    );
  }
});

if (App.TESTING_MODE) {
  Feed.adapter = Ember.FixtureAdapter.create({
    findAll: function(klass, records) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        var filtered = Em.A();
        klass.FIXTURES.forEach(function(child){
          if (child.unread > 0) {
            filtered.pushObject(child);
          }
        });
        records.load(klass, filtered);
      });
    }
  });

  Feed.FIXTURES = FeedFixtures;
}
export default Feed;
