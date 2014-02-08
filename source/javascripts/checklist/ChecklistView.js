namespace('Checklist', {
  ChecklistView: Backbone.View.extend({
    initialize: function(args) {
      this.template = args.template;
    },

    events: {
      'click input': 'updateTask'
    },

    render: function() {
      _.each(this.collection.sections(), function(section) {
        var el = $('[data-section-id=' + section + ']');
        var tasks = this.collection.tasksForSection(section);
        var data = { tasks: this.presentTasks(tasks) };
        el.html(this.template(data));
      }, this);
      this.renderProgressBar();
      return this;
    },

    renderProgressBar: function() {
      var percentComplete = Math.floor(this.collection.percentTasksCompleted() * 100);
      $(".progress-bar figure").css("width", percentComplete + "%");
    },

    presentTasks: function(tasks) {
      return _.map(tasks, function(task) {
        return {
          description: Checklist.DesignerPresentationData[task.get('section')].tasks[task.get('name')],
          complete: task.get('complete'),
          name: task.get('name')
        }
      }, this);
    },

    updateTask: function(e) {
      var el = $(e.currentTarget);
      var taskName = el.data('name');
      var complete = el.is(':checked');
      var task = this.collection.findWhere({name: taskName});
      task.save({complete: complete});
      this.renderProgressBar();
    }
  })
});