namespace("Checklist", {
  Section: Backbone.Collection.extend({
    //localStorage: new new Backbone.LocalStorage("Checklist.Section"),
    model: Checklist.Task,

    initialize: function(models, args) {
      this.name = args.name;
    }
  })
});
