import App from 'appkit/app';

import Item from 'appkit/models/item';
import ItemFixtures from 'appkit/models/item_fixtures';
import Feed from 'appkit/models/feed';
import FeedFixtures from 'appkit/models/feed_fixtures';

module("Unit - Item Model", {
  setup: function() {
    App.reset();
  }
});

test('it has a feed', function() {
  var items = Item.findQuery({id: 5});
  ok(items);
  var i = items.shiftObject();
  console.log(i.get('author'));
  Ember.run(function(){
    Feed.find(5);
    i.get('feed').reload();
    console.log(i.get('feed'));
  });
});
