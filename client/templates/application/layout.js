Template.header.helpers({
	userIsAdmin: function() {
		var user = Meteor.user();
		return user.profile.isAdmin == true;
	},
	userIsPlayer: function() {
		var user = Meteor.user();
		return user.profile.isAdmin == false;
	}
});