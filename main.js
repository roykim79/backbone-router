var AppRouter = Backbone.Router.extend({
  routes: {
    "help":                 "help",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  help: function() {
    console.log('helping!')
  },

  search: function(query) {
    console.log(query);
  }
});

var appRouter = new AppRouter;

// Start Backbone history
Backbone.history.start();
