var MrelloApp = MrelloApp || {}

MrelloApp.Views.Header = Backbone.View.extend({
  template: MrelloApp.templates['shared/header'],
  
  tagName: "header",
  className: "page-head",

  events: {
    "click #create-org" : "createOrg", // Admin only
    "click #logout"     : "logout", 
    "click #join-org"   : "joinOrg",
    "click #view-board" : "viewBoard", 
    "click #manage-org" : "manageOrganization", // Admin only
    "click #view-org"   : "viewOrganizationsBoard"
  },

  initialize: function(context) {
    this.context = context
    this.render()
    this.bindEvents()
    this.searchCards()
  },

  render: function() {
    this.$el.html(this.template(this.context))
    return this
  },

  bindEvents: function() {
    MrelloApp.boardsController.on("refreshSearch", this.searchCards)
  },

  searchCards: function() {
    console.log("searching...")
    var query = $("#search-bar input").val()
    
    $(".card").css({
      "background": "white",
      "box-shadow" : "none"
    })

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
  },

  viewBoard: function(e) {
    e.preventDefault()
    console.log("Viewing board")
    MrelloApp.routes.navigate("", { trigger: true })
  },

  manageOrganization: function(e) {
    e.preventDefault()
    console.log("Managing requests")
    MrelloApp.routes.navigate("organizations/show", { trigger: true })
  },

  viewOrganizationsBoard: function(e) {
    e.preventDefault()
    console.log("Attempting to view (shared) board.")
    
    // Get the shared org and then show it
    MrelloApp.currentUser.getSharedBoardId(function(boardId) {
      var url = "board/show/" + boardId
      MrelloApp.routes.navigate(url, { trigger: true })
    })
  }
})