var ActivitiesView = Backbone.View.extend({
    events: {
        'keypress #new-step': 'createOnEnter'
    },

    initialize: function() {
        this.activities = this.options.activities;

        this.activities.bind('add', this.render, this);
        this.activities.bind('reset', this.render, this);
    },

    addAll: function() {
        this.activities.each(this.addOne);
    },

    addOne: function(step) {
        var view = new ActivityView({model: step});
        this.$('#steps').append(view.render().el);
    },

    createOnEnter: function(e) {
        this.input = this.$('#new-step');
        var newStepText = this.input.val().trim();
        if (!newStepText || e.keyCode != 13) return;

        this.activities.create({'name': newStepText});

        this.input.val('');
    },

    render: function() {
        $(this.el).html(ich.activities({'dates':SimpleDates.chosenDates()}));
        this.addAll();
        return this;
    }

});
