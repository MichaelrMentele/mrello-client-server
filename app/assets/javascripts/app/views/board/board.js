// BoardView === User Board Page

// Subviews:
// Board -> Lists      

// Subviews Directly Managed by BoardView:
// Searchbar

// Events:
// On keyup Searchbar -> Filter lists views

MrelloApp.views.Board = Backbone.View.extend({

  template: MrelloApp.templates['board/board'],
  events: {
    "keyup #search-bar input" : "searchCards",
    "click #create-org" : "createOrg", // TODO: Move to header sub view
    "click #logout" : "logout", // TODO: move to header subview
    "click #join-org" : "joinOrg", // TODO: move to header subview
  },

  initialize: function() {
    this.render();
    this.bindEvents();
  },

  bindEvents: function() {
    MrelloApp.boardsController.on("refreshSearch", this.searchCards);
  },

  render: function() {
    this.$el.html(this.template({session:true} ));
    this.renderLists();
    this.searchCards();
    return this;
  },

  renderLists: function() {
    var listsView = new MrelloApp.views.Lists()
    this.$el.find("#lists-container").html(listsView.el)
  },

  searchCards: function() {
    console.log("searching...")
    var query = $("#search-bar input").val();
    
    $(".card").css({
      "background": "white",
      "box-shadow" : "none"
    });

    if (query) {
      $(".card:contains(" + query + ")").css({
        "background": "aqua",
        "box-shadow" : "4px 4px 4px #888888",
      })
    }
  },

  createOrg: function(e) {
    e.preventDefault()
    console.log("Creating organization")
    MrelloApp.routes.navigate("organizations/new", { trigger: true })
  },

  joinOrg: function(e) {
    e.preventDefault()
    console.log("Showing organizations to join")
    MrelloApp.routes.navigate("organizations", { trigger: true } )
  },
  
  logout: function(e) {
    e.preventDefault()
    console.log("Logging out")
    MrelloApp.routes.navigate("logout", { trigger: true })
  }
});