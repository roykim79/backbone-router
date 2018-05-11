var BeerView = Backbone.View.extend({
  className: 'beer',

  template: Handlebars.compile($('#beer-template').html()),

  events: {
    'click .remove': 'removeBeer',
    'click .edit': 'toggleEditMode',
    'keypress .edit-mode': 'updateBeer',
    'blur .edit-mode': 'close'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:edit_mode', this.renderEdit);
    this.listenTo(this.model, 'change', this.render);
  },

  close: function() {
    var value = this.$('.edit-mode').val();

    if (!this.model.get('edit_mode')) {
      return;
    }

    this.model.set('name', value);
    this.model.set('edit_mode', false);
    this.model.save()
  },

  removeBeer: function() {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  renderEdit: function() {
    this.$el.toggleClass('editing', this.model.get('edit_mode'));
  },

  toggleEditMode: function() {
    this.model.set('edit_mode', !this.model.get('edit_mode'));
    // this.$el.toggleClass('editing');
  },

  updateBeer: function(e) {
    if (e.keyCode === 13 && this.$('input').val()) {
      this.close();
    }
  }
});
