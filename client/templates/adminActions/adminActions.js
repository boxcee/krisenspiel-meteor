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

    }
});

Template.actionsToEdit.events({
    'click #actionEdit': function() {

        Session.set("editDiv", this._id);

    },
    'click #ok': function(e) {
        e.preventDefault();

        var action = this;

        var commentFromAdmin = document.getElementById("comment").value;

        var newAction = _.extend(action, {
            comment: commentFromAdmin,
            status: "yes"
        });

        Meteor.call('progressAction', newAction, action, function (err, result) {
            if (err)
                alert(err.reason);
        });

        Session.set("editDiv", "");
    }
});

Template.editedActions.helpers({
    editedAction: function() {

        return playerActions.find({status: {$in: ["no", "yes"]}}, {sort: {time: -1}});

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

    }
})