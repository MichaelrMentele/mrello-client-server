var MrelloApp = MrelloApp || {};

MrelloApp.Models.Card = Backbone.Model.extend({
  
  defaults: {
    title: "Card",
    description: "",
  },

  parse: function(response, options) {
    if(response.card) {
      return response.card;
    } else {
      return response;
    }
  },

  initialize: function(attributes) {
    console.log("New Card Created");

    // Store useful references to parent list.
    this.storeListReference()

    // Setup sub resources
    this.initializeComments()
    this.initializeChecklists()
  },

  // Initializers
  initializeComments: function() {
    this.set("comments", new MrelloApp.Collections.Comments());
    this.get("comments").parent = this; // store a reference to this in child
    // TODO: Move to comments controller
    // this.get("comments").fetch({
    //   data: $.param({ card_id: this.id})
    // })
  },

  initializeChecklists: function() {
    this.set("checklists", new MrelloApp.Collections.Checklists());
    this.get("checklists").parent = this; 
    //TODO :MOVE TO CHECKLISTS controller
    // this.get("checklists").fetch({
    //   data: $.param({ card_id: this.id})
    // })
  },

  storeListReference: function() {
    if (this.collection) {
      // Look for the parent Lists' title and cache it for easy rendering
      this.set("listTitle", this.collection.parent.get("title"));

      // Store a reference to parent list to associate server side
      this.set("list_id", this.collection.parent.get("id"));
    }
  }
});