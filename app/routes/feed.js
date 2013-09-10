import Item from 'appkit/models/item';

var FeedRoute = Ember.Route.extend({
  model: function(params){
    console.log("model feed", params);
    return {id: params.feed_id};
  },
  setupController: function(controller, model) {
    console.log("feed sc model", model);
    var feed_id = model.id;
    var item_models = Item.findQuery({id: feed_id});
    console.log("feed sc model result: ", item_models);
    controller.set('model', item_models);
    controller.set('content', item_models);
  },
});

export default FeedRoute;
