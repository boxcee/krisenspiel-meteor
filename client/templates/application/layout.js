Template.header.helpers({
	isPlayer: function() {
		var user = Meteor.user();

		if (!user.profile.isAdmin)
			return true;
	},
	isAdmin: function() {
		var user = Meteor.user();

		if (user.profile.isAdmin)
			return true;
	},
	timerChange: function() {

		Meteor.call('howMuchTime', function(err, result) {
			return result;
		});

	}
});

Template.header.events({
	'click button': function(e) {
		e.preventDefault();

		Meteor.call('timerClock');

	}
});