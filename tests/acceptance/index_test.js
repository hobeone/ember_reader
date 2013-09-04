import Index from 'appkit/routes/index';
import App from 'appkit/app';

module("Acceptances - Index", {
  setup: function(){
    App.reset();
  }
});

test("index renders", function(){
  visit('/').then(function(){
    ok(exists("a:contains('EmberReader')"));

    var list = find(".nav li:eq(0) > a");
    find(".nav li:eq(0) > a");
    equal(list.length, 1);
    equal(list.text(), 'Feeds')
  });
});
