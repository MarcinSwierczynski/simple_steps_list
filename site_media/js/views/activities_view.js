var ActivitiesView = Backbone.View.extend({
    el: $('#steps-list'),

    events: {
        'keypress #new-step': 'createOnEnter'
    },

    initialize: function() {
        this.input = this.$('#new-step');
        this.activities = this.options.activities;

        this.activities.bind('add', this.addOne, this);
        this.activities.bind('reset', this.addAll, this);
    },

    addAll: function() {
        this.activities.each(this.addOne);
    },

    addOne: function(step) {
        var view = new ActivityView({model: step});
        this.$('#steps').append(view.render().el);
    },

    createOnEnter: function(e) {
        var newStepText = this.input.val();
        if (!newStepText || e.keyCode != 13) return;

        var newStep = new Activity({'name': newStepText});
        this.activities.add(newStep);
        newStep.save();

        this.input.val('');
    }

});
