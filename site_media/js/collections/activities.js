var Activity = Backbone.Model.extend({

});

var Activities = Backbone.Collection.extend({
    model: Activity,

    url: "/step/"
});
