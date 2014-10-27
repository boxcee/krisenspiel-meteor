Template.addAction.helpers({
    myUser: function() {
        var user = Meteor.user();
        return user.username;
    }
});

Template.displayAction.helpers({
    userAction: function() {
        var user = Meteor.user();

        return playerActions.find({initiator: user.username}, {sort: {time: 1}});

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

    }
});

$(function() {
    $('#input-tags').selectize({
        delimiter: ',',
        persist: false,
        create: true
    });
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
    $('#actors').selectize({
        delimiter: ',',
        persist: false,
        highlight: true,
        openOnFocus: true,
        options: playerCount.find({fields: {username: 1}}),
        create: true
    });
};