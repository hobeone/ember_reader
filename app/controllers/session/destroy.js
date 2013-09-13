import App from 'appkit/app';

var SessionDestroyController = Ember.Controller.extend({
  logout: function() {
    App.Session.setProperties({
      session_id:     '',
    });
    console.log('Logged out and removed session.');
    this.transitionToRoute('session.new');
  }
});

export default SessionDestroyController;
