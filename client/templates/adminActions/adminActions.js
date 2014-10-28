Template.actionsToEdit.helpers({
    actionToEdit: function() {

        return playerActions.find({status: {$in: ["maybe", "pending"]}}, {sort: {time: 1}});

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
    actionEdit: function() {

        return Session.get("editDiv") === this._id;

    },
    actorsString: function() {

        if (this.actors[0].length < 1)

            var aString = this.initiator;

        else

            var aString = this.initiator + ', ' + this.actors.join(', ');

        return aString;

    }
});

Template.actionsToEdit.events({
    'click #actionEdit': function() {

        Session.set("editDiv", this._id);

    },
    'click button': function(e) {
        e.preventDefault();

        var targetId = e.currentTarget.id;

        var action = this;

        if (typeof this.comment === 'undefined')

            action.comment = document.getElementById("comment").value;

        else if (document.getElementById("comment").value)

            action.comment += " *" + document.getElementById("comment").value + "*";

        var newAction = _.extend(action, {
            status: targetId
        });

        Meteor.call('progressAction', newAction, this, function (err, result) {
            if (err)
                alert(err.reason);
        });

        Session.set("editDiv", "");
    }
});

Template.editedActions.helpers({
    editedAction: function() {

        return playerActions.find({status: {$in: ["no", "yes"]}}, {sort: {time: 1}});

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