$(function() {
    window.Step = Backbone.Model.extend({

    });

    window.StepsList = Backbone.Collection.extend({
        model: Step,

        url: "/step/"
    });

    window.Steps = new StepsList;

    window.StepView = Backbone.View.extend({
        tagName: "li",

        template: _.template("Activity: <%= name %>"),

        initialize: function() {
            this.model.bind('change', this.render, this);
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    window.AppView = Backbone.View.extend({
        el: $('#steps-list'),

        events: {
            'keypress #new-step': 'createOnEnter'
        },

        initialize: function() {
            this.input = this.$('#new-step');

            Steps.bind('add', this.addOne, this);
            Steps.bind('reset', this.addAll, this);

            Steps.fetch();
        },

        addAll: function() {
            Steps.each(this.addOne);
        },

        addOne: function(step) {
            var view = new StepView({model: step});
            this.$('#steps').append(view.render().el);
        },

        createOnEnter: function(e) {
            var newStepText = this.input.val();
            if (!newStepText || e.keyCode != 13) return;

            var newStep = new Step({'name': newStepText});
            Steps.add(newStep);
            newStep.save();

            this.input.val('');
        }

    });

    window.App = new AppView;
});
