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
	}
});