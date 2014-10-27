Template.addAction.helpers({
    myUser: function() {
        var user = Meteor.user();
        return user.username;
    }
});

$(function() {
    $('#input-tags').selectize({
        delimiter: ',',
        persist: false,
        create: true
    });
});