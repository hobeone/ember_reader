import AuthenticatedRoute from 'appkit/routes/authenticated';
import Feed from 'appkit/models/feed';

var FeedsRoute = AuthenticatedRoute.extend({
  model: function(){
    return Feed.find();
  },
});

export default FeedsRoute;
