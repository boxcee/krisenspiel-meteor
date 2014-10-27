Template.addAction.helpers({
    myUser: function() {
        var user = Meteor.user();
        return user.username;
    }
});

Template.displayAction.helpers({
    userAction: function() {
        return playerActions.find();
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

        var actionContent = {
            action: document.getElementById('action'),
            actors: user.username + " " + document.getElementById('actors'),
            time: new Date().now,
            type: "offen"
        };

        Meteor.call('addAction', actionContent, function(err, result) {
            if (err)
                alert(err.reason)
        });

    }
});