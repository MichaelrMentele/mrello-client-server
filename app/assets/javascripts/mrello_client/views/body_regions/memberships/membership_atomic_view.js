// Organization === Individual organization to join on index

var MrelloApp = MrelloApp || {};

MrelloApp.Views.Atomics.Membership = Backbone.View.extend({

  template: MrelloApp.templates['organizations/joinRequest'],

  tagName: "li",
  className: "join-request clearfix",

  events: {
    "click .approve" : "handleApproval"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) )
    return this
  },

  handleApproval: function(e) {
    e.preventDefault()
    console.log("Admin approving request and sharing board")
    debugger;
    this.model.save({approved: true}, {  
      success: function(model, response, options) {
        console.log("Join request approved.")
        MrelloApp.routes.navigate("", { trigger: true })
      },
      error: function(model, response, options) {
        console.log("Approval failed")
      }
    })
  }
});