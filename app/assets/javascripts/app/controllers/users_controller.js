var MrelloApp = MrelloApp || {};

MrelloApp.controllers.Users = Backbone.Controller.extend({
  containerID: "#app-container",
  initialize: function() {
    this.on("new", this.new);
  },
  new: function() {
    console.log("Rendering registration form");
    
    var registerView = new MrelloApp.views.Registration();
    this.render(registerView)
  },
});