var MainRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "about": "about",
        "activities": "activities"
    },

    index: function() {
        // TODO
    },

    about: function() {
        view = new AboutView();
        $('#content').html(view.render().el);
    },

    activities: function() {
        activities = new Activities;
        activities.fetch();

        view = new ActivitiesView({activities: activities});
        $('#content').html(view.render().el);
    }
});