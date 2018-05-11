var BeersCollection = Backbone.Collection.extend({
  url: 'https://beer-review-api.herokuapp.com/beers',
  model: BeerModel
});
