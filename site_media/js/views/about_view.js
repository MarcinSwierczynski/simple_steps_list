var AboutView = Backbone.View.extend({

    render: function() {
        $(this.el).html(ich.about());
        return this;
    }

});
