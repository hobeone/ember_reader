import App from 'appkit/app';
import FeedFixtures from 'appkit/models/feed_fixtures';

var Feed = Ember.Model.extend({
  title: Ember.attr(),
  unread: Ember.attr(Number),
  items: Ember.A(),
});

Feed.adapter = Ember.Adapter.create({
  findAll: function(klass, records) {
    return Ember.$.post(
      App.TTRSS_URL,
      JSON.stringify({
        op:"getFeeds",
        sid: App.Session.get('sessionId'),
        cat_id:"-4"})
    ).then(
      function(response) {
        var feeds = Em.A();
        var collections = Em.A();
        console.log("Feed findAll: ", response);
        if (response.content.error) {
          window.alert("Error: "+response.content.error);
          throw "Error: "+response.content.error;
        }
        var filtered = Em.A();
        response.content.forEach(function (child) {
          if (child.id < 0) {
            collections.pushObject(child);
          }
          if (child.id > 0 && child.unread > 0) {
            filtered.pushObject(child);
          }
        });

        collections.sort(
          function(a,b) {
            return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
          }
        );
        filtered.sort(
          function(a,b) {
            return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
          }
        );
        records.load(klass, collections.concat(filtered));
      }
    );
  }
});

if (App.OFFLINE_DEV_MODE) {
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
