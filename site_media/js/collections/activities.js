var Activity = Backbone.Model.extend({
    validate: function(attrs) {
        if (attrs.name.trim().length <= 0) {
            return "Please, enter activity name";
        }
    }
});

var Activities = Backbone.Collection.extend({
    model: Activity,

    url: "/step/"
});
