import App from 'appkit/app';

var SessionNewController = Ember.Controller.extend({
  actions: {
    login: function() {
      var self = this;
      var data = this.getProperties('user', 'password');
      if (!Ember.isEmpty(data.user) && !Ember.isEmpty(data.password)) {
        if (App.OFFLINE_DEV_MODE) {
          console.log('Offline dev mode active.  Creating fake session.');
          App.Session.set('sessionId', 'testing123');
          self.transitionToRoute('feeds');
        } else {
          data.op = 'login';

          Ember.$.ajax(
            App.TTRSS_URL,
            {
              type: "POST",
              data: JSON.stringify(data),
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
            }
          ).then(function(response){
            self.set('errorMessage', response.content.error);
            if (response.content.session_id) {
              App.Session.set('sessionId', response.content.session_id);
              var attemptedTransition = self.get('attemptedTransition');
              if (attemptedTransition) {
                attemptedTransition.retry();
                self.set('attemptedTransition', null);
              } else {
                self.transitionToRoute('feeds');
              }
            }
          });
        }
      }
    }
  }
});

export default SessionNewController;
