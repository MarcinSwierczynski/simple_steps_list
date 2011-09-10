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
        className: "activity",

        events: {
            'dblclick div.activity-content': 'edit',
            'keypress .activity-input': 'updateOnEnter'
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
        },

        render: function() {
            $(this.el).html(ich.activity(this.model.toJSON()));
            this.setText();
            return this;
        },

        edit: function() {
            $(this.el).addClass("editing");
            this.input.focus();
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },

        setText: function() {
            var name = this.model.get("name");
            this.input = this.$('.activity-input');
            this.input.bind('blur', _.bind(this.close, this)).val(name);
        },

        close: function() {
            this.model.save({name: this.input.val()});
            $(this.el).removeClass("editing");
        }

    });

    window.AppView = Backbone.View.extend({
        el: $('#steps-table'),

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
