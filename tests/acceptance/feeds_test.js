import App from 'appkit/app';
import LoginController from 'appkit/controllers/login';
import Feed from 'appkit/models/feed';
import Item from 'appkit/models/item';

App.Auth.requestAdapter = 'dummy';
App.Auth.responseAdapter = 'dummy';
App.Auth.strategyAdapter = 'dummy';

var FEED_FIXTURES = Ember.A([
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
]);

var ITEM_FIXTURES = [
  {
    id: 1,
    title: 'test',
    author: 'first author',
    content: 'Test content',
    excerpt: 'test excerpt',
    feed_id: 2,
    feed_title: 'baz',
    updated: '123',
    link: "http://google.com",
    read: false,
    marked_read: false,
  },
  {
    id: 2,
    title: 'test2',
    author: 'test author2',
    content: 'Test content2',
    excerpt: 'test excerpt2',
    feed_id: 2,
    feed_title: 'baz2',
    updated: '321',
    link: "http://youtube.com/",
    read: false,
    marked_read: false,
  },
  {
    id: 3,
    title: 'test3',
    author: 'test author3',
    content: 'Test content3',
    excerpt: 'test excerpt3',
    feed_id: 3,
    feed_title: 'baz3',
    updated: '321123',
    link: "http://youtube.com/",
    read: true,
    marked_read: false,
  }
];

Feed.adapter = Ember.FixtureAdapter.create();
Feed.FIXTURES = FEED_FIXTURES;

Item.adapter = Ember.FixtureAdapter.create({
  findQuery: function(klass, records, params) {
    records.load(klass, klass.FIXTURES);
  }
});
Item.FIXTURES = ITEM_FIXTURES;

module("Acceptances - Feeds", {
  setup: function(){
    App.reset();
  }
});

test("feeds needs login", function(){
  expect(4);
  //App.Auth.destroySession();
  visit('/feeds').then(function(){
    ok(exists("a:contains('EmberReader')"));
    ok(exists("h2:contains('Log In')"));

    var list = find(".nav li:eq(0) > a");
    equal(list.length, 1);
    equal(list.text(), "Feeds");
  });
});

test("feeds renders when logged in", function(){
  Ember.run(function() {
    App.Auth.createSession('{"foo": "bar"}');
  });
  expect(3);
  visit('/feeds').then(function(){
    ok(exists("a:contains('EmberReader')"));
    var list = find("#feed-list > li");
    equal(list.length, 2);
    equal(list.text(), 'foobar (10)baz (3)');
  });
});


test("show feed", function() {
  Ember.run(function() {
    App.Auth.createSession('{"foo": "bar"}');
  });

  visit('/feeds/1').then(function() {
    ok(exists("a:contains('EmberReader')"));
    var list = find(".hero-unit");
    equal(list.length, 3, "3 items shown");
    var a = find(".hero-unit:first");
    ok(a.text().indexOf('first author') !== -1,
       "'first author not found in first post'");
  });
});

test("keyboard navigation of items", function() {
  Ember.run(function() {
    App.Auth.createSession('{"foo": "bar"}');
  });

  visit('/feeds/1').then(function() {
    var list = find(".hero-unit");
    equal(list.length, 3, "3 items shown");
  })
  .keyEvent('.hero-unit:first', 'keypress', 74)
  .then(function(){
    var list = find(".hero-unit");
    equal(list.length, 2, "2 items shown");
  })
  .keyEvent('.hero-unit:first', 'keypress', 75)
  .then(function(){
    var list = find(".hero-unit");
    equal(list.length, 3, "3 items shown");
  })
  .keyEvent('.hero-unit:first', 'keypress', 74)
  .keyEvent('.hero-unit:first', 'keypress', 74)
  .keyEvent('.hero-unit:first', 'keypress', 74)
  .keyEvent('.hero-unit:first', 'keypress', 74)
  .then(function(){
    var list = find(".hero-unit");
    equal(list.length, 1, "1 items shown");
  });
});

test("keyboard open of item", function() {
  Ember.run(function() {
    App.Auth.createSession('{"foo": "bar"}');
  });

  visit('/feeds/1').then(function() {
    var list = find(".hero-unit");
    equal(list.length, 3, "3 items shown");
  })
  .keyEvent('.hero-unit:first', 'keypress', 111)
  .then(function(){
    var list = find(".hero-unit");
    equal(list.length, 3, "3 items shown");
  });
});
