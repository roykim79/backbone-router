var ReviewView = Backbone.View.extend({
  template: Handlebars.compile($('#review-template').html()),

  events: {
    'click .remove': 'deleteReview'
  },

  initialize: function() {
  },

  deleteReview: function() {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});
