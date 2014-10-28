function possibleActors() {

    var actorArray = playerCount.find({}, {fields: {username: 1}}).fetch();

    var actorString = "";

    for ( i = 0; i < actorArray.length; i++)

        if ( i+1 === actorArray.length)

            actorString += actorArray[i].username;

        else

            actorString += actorArray[i].username + ",";

    return actorString;

}

Template.displayAction.helpers({
    userAction: function() {
        var user = Meteor.user();

        return playerActions.find({$or: [{initiator: user.username}, {actors: user.username}], status: {$in: ["maybe", "pending"]}}, {sort: {time: 1}});

    },
    isHidden: function() {

        return this.hidden === 1;

    },
    actionStatus: function() {

        if (this.status === "pending")
            return "background-color: #31B0D5; color: white;";
        else if (this.status === "yes")
            return "background-color: #449D44; color: white;";
        else if (this.status === "no")
            return "background-color: #C9302C; color: white;";
        else if (this.status === "maybe")
            return "background-color: #EC971F; color: white;";

    },
    actionEdit: function() {

        return Session.get("editAction") === this._id;

    },
    actorsString: function() {

        if (this.actors[0].length < 1)

            var aString = this.initiator;

        else

            var aString = this.initiator + ', ' + this.actors.join(', ');

        return aString;

    }
});

$(function() {
    $('#input-tags').selectize({
        delimiter: ',',
        persist: false,
        create: true
    });
});

Template.displayAction.events({
    'click #actionEntry': function() {

        Session.set("editAction", this._id);

    },
    'click button': function(e) {
        e.preventDefault();

        var targetId = e.currentTarget.id;

        var action = this;

        action.action += " [" + document.getElementById("newAction").value + "]";

        action.status = targetId;

        Meteor.call('progressAction', action, this, function (err, result) {
            if (err)
                alert(err.reason);
        });

        Session.set("editAction", "");
    }
});

Template.addAction.events({
    'click #offen': function(e) {
        e.preventDefault();

        var user = Meteor.user();

        var actorsVariable = document.getElementById('actors').value.split(',');

        var actionContent = {
            action: document.getElementById('action').value,
            initiator: user.username,
            actors: actorsVariable,
            time: new Date().getTime(),
            hidden: 0,
            status: "pending"
        };

        Meteor.call('addAction', actionContent, function(err, result) {
            if (err)
                alert(err.reason)
        });

    },
    'click #geheim': function(e) {
        e.preventDefault();

        var user = Meteor.user();

        var actorsVariable = document.getElementById('actors').value.split(',');

        var actionContent = {
            action: document.getElementById('action').value,
            initiator: user.username,
            actors: actorsVariable,
            time: new Date().getTime(),
            hidden: 1,
            status: "pending"
        };

        Meteor.call('addAction', actionContent, function(err, result) {
            if (err)
                alert(err.reason)
        });

    }
});

Template.addAction.rendered = function() {

    $('#actors').val(possibleActors()).selectize({
        delimiter: ',',
        persist: false,
        highlight: true,
        openOnFocus: true,
        allowEmptyOption: false,
        create: false
    });
};

Template.displayFinishedActions.helpers({
    userAction: function() {

        var user = Meteor.user();

        return playerActions.find({$or: [{initiator: user.username}, {actors: user.username}], status: {$in: ["yes", "no"]}}, {sort: {time: 1}});

    },
    actionStatus: function() {

        if (this.status === "pending")
            return "background-color: #31B0D5; color: white;";
        else if (this.status === "yes")
            return "background-color: #449D44; color: white;";
        else if (this.status === "no")
            return "background-color: #C9302C; color: white;";
        else if (this.status === "maybe")
            return "background-color: #EC971F; color: white;";

    },
    isHidden: function() {

        return this.hidden === 1;

    },
    actorsString: function() {

        if (this.actors[0].length < 1)

            var aString = this.initiator;

        else

            var aString = this.initiator + ', ' + this.actors.join(', ');

        return aString;

    }
});