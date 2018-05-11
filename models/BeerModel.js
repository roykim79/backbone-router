var BeerModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: function() {
    return {
      name: '',
      style: '',
      abv: null,
      image_url: '',
      edit_mode: false,
      reviews: new ReviewsCollection()
    };
  },

  parse: function(response) {
    var reviews = this.get('reviews') || new ReviewsCollection();

    reviews.set(response.reviews);
    response.reviews = reviews;
    reviews.url = 'https://beer-review-api.herokuapp.com/beers/' + response._id + '/reviews/';

    return response;
  }
});
