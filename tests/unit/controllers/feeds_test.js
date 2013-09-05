import App from 'appkit/app';
import Feed from 'appkit/models/feed';

var FEED_FIXTURES = [
  {
    id: 1,
    title: 'foobar',
    unread: 10,
  },
  {
    id: 2,
    title: 'baz',
    unread: 3,
  }
];
Feed.adapter = Ember.FixtureAdapter.create();
Feed.FIXTURES = FEED_FIXTURES;

module("Unit - FeedsController", {
  setup: function(){
    App.reset();
  }
});

test("it exists", function(){
  Ember.run(function() {
    App.Auth.createSession('{"foo": "bar"}');
  });

  visit('/feeds').then(function(){
    ok(exists("a:contains('EmberReader')"));
    var list = find("#feed-list > li");
    equal(list.length, 2);
    equal(list.text(), 'foobar (10)baz (3)');
  })
  .then(function(){
    Feed.FIXTURES = [{id: 3, title: 'reloaded', unread: 10}];
    Ember.run(function() {
      Ember.controllerFor(App.__container__, 'feeds').send('reloadFeeds');
    });
  })
  .then(function(){
    var list = find("#feed-list > li");
    equal(list.length, 1);
    equal(list.text(), 'reloaded (10)');
  });
});
