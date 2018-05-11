var AppView = Backbone.View.extend({
  el: $('body'),

  views: [],

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function() {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.detailView = null;

    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);
    this.listenTo(this.model, 'change:show_reviews', this.renderPage);
    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);
    this.listenTo(this.model.get('beers'), 'destroy', this.removeBeerView);
    this.listenTo(this.model.get('beers'), 'reset', this.rnderBeers);

    this.renderBeers();
  },

  createBeer: function() {
    this.model.get('beers').create({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: parseInt(this.$abvInput.val()),
      image_url: this.$imgUrl.val()
    }, { wait: true });
  },

  removeBeerView: function(beer) {
    var toRemove = this.views.find(function(item) {

      return item.model.cid == beer.cid;
    });

    toRemove.remove();

    this.views.splice(this.views.indexOf(toRemove), 1);
  },

  renderBeer: function(beer) {
    var beerView = new BeerView({
      model: beer
    });

    this.views.push(beerView);

    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function() {
    this.model.get('beers').each(function(m) {
      this.renderBeer(m);
    }, this);
  },

  renderDetailView: function() {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({model: this.model.get('current_beer')});

    this.$('.reviews-container').append(this.detailView.render().el);
  },

  renderPage: function() {
    this.$('.reviews-container').toggleClass('show', this.model.get('show_reviews'));
    this.$('.beers-container').toggleClass('show', !this.model.get('show_reviews'));
  }
});
