var BeerDetailView = Backbone.View.extend({
  tagName: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),

  views: [],

  events: {
    'click .submit-review': 'createReview'
  },

  initialize: function() {
    this.listenTo(this.model.get('reviews'), 'add', this.renderReview);
    this.listenTo(this.model.get('reviews'), 'destroy', this.removeView);
  },

  createReview: function() {
    var $textInput = this.$el.find('#review-notes-input');
    var $nameInput = this.$el.find('#review-name-input');
    var text = $textInput.val();
    var name = $nameInput.val();

    this.model.get('reviews').create({
      text: text,
      name: name
    });

    $textInput.val('');
    $nameInput.val('');
  },

  removeView: function(review) {
    toRemove = this.views.find(function(item) {
      return item.model = review;
    });
    console.log('review: ', review);
    console.log('toRemove: ', toRemove.model);

    toRemove.remove();

    this.views.splice(this.views.indexOf(toRemove), 1);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.renderReviews();

    return this;
  },

  renderReview: function(review) {
    var reviewView = new ReviewView({model: review});

    this.views.push(reviewView);

    this.$('.reviews-list').append(reviewView.render().el);
  },

  renderReviews: function() {
    this.model.get('reviews').each(function(m) {
      this.renderReview(m);
    }, this);
  }
});
