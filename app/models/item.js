import App from 'appkit/app';

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

  item_content: function(){
    return this.get('content');
  }.property('content'),

  markRead: function() {
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
          this.set('read', true);
          this.set('marked_read', true);
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
      sid: window.localStorage.session_id,
      feed_id: params.id,
      show_excerpt: true,
      show_content: true,
      view_mode: "unread",
      include_attachments: true,
      include_nested: true
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

export default Item;
