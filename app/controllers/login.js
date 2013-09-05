import ApplicationController from 'appkit/controllers/application';
import App from 'appkit/app';

var LoginController = Ember.Controller.extend({
  reset: function() {
    this.setProperties({
      user: "",
      password: "",
      errorMessage: ""
    });
  },

  actions: {
    login: function() {
      this.set('errorMessage', null);
      var data = this.getProperties('user', 'password');
      data.op = 'login';

      return App.Auth.signIn({
        data: data
      });
      /*
      Ember.$.ajax(App.TTRSS_URL,
                  {
                    type: "POST",
                    data: JSON.stringify(data),
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    },
      }).then(function(response) {
        self.set('errorMessage', response.content.error);
        if (response.content.session_id) {
          self.set('session_id', response.content.session_id);
          var attemptedTransition = self.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set('attemptedTransition', null);
          } else {
            self.transitionToRoute('about');
          }
        }
      });
      */
    }
  }
});

export default LoginController;
