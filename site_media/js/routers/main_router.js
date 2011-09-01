var MainRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "activities": "activities"
    },

    index: function() {
        // TODO implement
    },

    activities: function() {
        activities = new Activities;
        activities.fetch();

        view = new ActivitiesView({activities: activities});
    }
});