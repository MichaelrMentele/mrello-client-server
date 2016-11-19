// App -> lists -> list-1 -> cards -> card-1 -> ...
//                 list-n -> cards -> card-n -> comments    -> comment-n
//                                              checklists  -> checklist-n

// App Data:
// - A collection of lists

// Lists Data:
// - list constructor
// - models

// List Data:
// - An id
// - A title (string)
// - A collection of cards

// Cards data:
// - card constructor
// - models

var MrelloApp = {
  // constructor namespaces
  models: {},      
  collections: {}, 
  views: {},     
  routers: {}, 
  templates: HandlebarsTemplates,
  // application objects -- called out here for readability
  data: {},
  routes: {},
  session: {}, // singleton session model
  events: {},
  containerID: "#app-container",
  init: function() {
    console.log("Mrello starting up...")

    // Setup
    this.data = new this.collections.Lists();  
    this.session = new this.models.Session();
    this.events = _.extend({}, Backbone.Events);
    this.bindEvents();

    // Run
    this.routes = new this.routers.MrelloRouter(); // first create instance of router
    Backbone.history.start({pushState: true});         // pushState uses the full URL
  },
  bindEvents: function() {
    MrelloApp.events.on("renderBoard", MrelloApp.renderBoard, this);
    MrelloApp.events.on("renderLogin", MrelloApp.renderLogin, this);
    MrelloApp.events.on("renderRegistration", MrelloApp.renderRegistration, this);
  },
  renderBoard: function() {
    console.log("Rendering board");
    this.clearAppView();

    var boardView = new MrelloApp.views.Board()
    this.render(boardView)
  },
  renderLogin: function() {
    console.log("Rendering login page");
    this.clearAppView();

    var loginView = new MrelloApp.views.Login();
    this.render(loginView);
  },
  renderRegistration: function() {
    console.log("Rendering registration form");
    this.clearAppView();

    var registerView = new MrelloApp.views.Registration();
    this.render(registerView)
  },
  clearAppView: function() {
    $(this.containerID).empty();
  },
  render: function(view) {
    $(MrelloApp.containerID).html(view.el);
  }
}

                                 