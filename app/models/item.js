import App from 'appkit/app';
import Feed from 'appkit/models/feed';
import ItemFixtures from 'appkit/models/item_fixtures';

var Item = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  author: Ember.attr(),
  content: Ember.attr(),
  excerpt: Ember.attr(),
  feed_id: Ember.attr(),
  feed_title: Ember.attr(),
  updated: Ember.attr(),
  link: Ember.attr(),
  read: Ember.attr(),
  marked_read: Ember.attr(),

  feed: Ember.belongsTo(Feed, {key: 'feed_id'}),

  item_content: function(){
    return this.get('content');
  }.property('content'),

  markRead: function() {
    var self = this;
    return Ember.$.post(
      App.TTRSS_URL,
      JSON.stringify({
        op: "updateArticle",
        sid: window.localStorage.session_id,
        article_ids: this.get('id'),
        mode: 0,
        field: 2
      })).then(
        function(response) {
          console.log("Item markRead: ", response);
          if (response.content.error) {
            throw "Error: "+response.content.error;
          }
          self.set('read', true);
          self.set('marked_read', true);
          return true;
        }
      );
  }

});

Item.adapter = Ember.Adapter.create({
  findQuery: function(klass, records, params) {
    console.log("item findall arguments:", params);
    var req = {
      op: "getHeadlines",
      sid: App.Session.get('session_id'),
      feed_id: params.id,
      show_excerpt: false,
      show_content: true,
      view_mode: "unread",
      include_attachments: true,
      include_nested: true,
      order_by: 'date_reverse',
      sanitize: false,
    };
    return Ember.$.post(App.TTRSS_URL, JSON.stringify(req)).then(
      function(response) {
        console.log("getheadlines response", response);
        if (response.content.error) {
          throw "Error: "+response.content.error;
        }
        return records.load(klass, response.content);
      }
    );  
  }
});

if (App.OFFLINE_DEV_MODE) {
  Item.adapter = Ember.FixtureAdapter.create({
    findQuery: function(klass, records, params) {
      console.log("Got fixture result for: "+params);
      return new Ember.RSVP.Promise(function(resolve, reject) {    
        var filtered = Em.A();
        console.log("Searching through "+klass.FIXTURES.length);
        klass.FIXTURES.forEach(function(child){
          if (params.id < 0 || (window.parseInt(child.feed_id) === window.parseInt(params.id))) {
            filtered.pushObject(child);
          }
        });
        console.log("Found "+filtered.length+" records matching feed_id "+params.id);
        records.load(klass, filtered);
      });
    }
  });
  Item.FIXTURES = ItemFixtures;
}
export default Item;
