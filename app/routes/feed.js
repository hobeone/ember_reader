import Item from 'appkit/models/item';
import AuthenticatedRoute from 'appkit/routes/authenticated';
import ItemView from 'appkit/views/item';

var FeedRoute = AuthenticatedRoute.extend({
  model: function(params){
    console.log("model feed", params);
    return {id: params.feed_id};
  },
  setupController: function(controller, model) {
    var feed_id = model.id;
    var item_models = Item.findQuery({id: feed_id});
    controller.set('model', item_models);
    controller.set('content', item_models);
    window.scrollTo(0);
  },
});

export default FeedRoute;
