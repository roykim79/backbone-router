var AppModel = Backbone.Model.extend({
  defaults: function() {
    return {
      beers: new BeersCollection(),

      current_beer: null,


      show_reviews: false
    }
  }
});
