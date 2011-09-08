var ActivityView = Backbone.View.extend({
    tagName: "li",
    className: "activity",

    events: {
        'dblclick div.activity-content': 'edit',
        'keypress .activity-input': 'updateOnEnter',
        'click span.delete-activity': 'remove'
    },

    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('error', this.showValidationError, this);
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
    }

});
