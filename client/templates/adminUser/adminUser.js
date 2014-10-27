Template.adminUser.helpers({
	user: function() {
		return Meteor.users.find()
	}
});