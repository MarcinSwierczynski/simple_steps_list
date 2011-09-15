var ActivityView = Backbone.View.extend({
    tagName: "span",
    className: "activity",

    events: {
        'dblclick div.activity-content': 'edit',
        'keypress .activity-input': 'updateOnEnter',
        'click span.delete-activity': 'remove',
        'click input.activity-done': 'done'
    },

    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('error', this.showValidationError, this);
    },

    render: function() {
        var activity = this.model.toJSON();
        activity["displayedDatesInActivityContext"] = SimpleDates.displayedDatesInActivityContext(this.model.get("dates"));

        $(this.el).html(ich.activity(activity));
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
        var isSaved = this.model.save({name: this.input.val()});
        if (isSaved) {
            $(this.el).removeClass("editing");
            $(this.input).removeClass("error");
        }
    },

    remove: function() {
        this.model.destroy();
        $(this.el).remove();
    },

    showValidationError: function(model, error) {
        $(this.input).addClass("error");
    },

    done: function(e) {
        var dateToMark = e.target.name;

        var dateIndexInModel = jQuery.inArray(dateToMark, this.model.get("dates"));
        var dateCurrentlyMarked = dateIndexInModel > -1;

        if(dateCurrentlyMarked) {
            this.model.get("dates").splice(dateIndexInModel, 1);
        } else {
            this.model.get("dates").push(dateToMark);
        }

        this.model.save();
    }

});
