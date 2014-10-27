playerActions = new Mongo.Collection('playerActions');

Meteor.methods({
    addAction: function(attr) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error("No User", "Du musst eingeloggt sein.");

        if (!attr.action)
            throw new Meteor.Error("No Data", "Du musst eine Handlung eintragen.");

        return playerActions.insert(attr);

    }
});