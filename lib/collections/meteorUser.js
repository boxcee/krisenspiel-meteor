Meteor.methods({
	makeUser: function(attr) {
		var user = Meteor.user();
		if (user.profile.isAdmin)
			return Accounts.createUser(attr);
		else
			throwError("Du besitzt nicht die benötigten Rechte.");
	},
	deleteUser: function(attr) {
		var user = Meteor.user();
		if (user.profile.isAdmin)
			Meteor.users.remove(attr.playerId);
		else
			throwError("Du besitzt nicht die benötigten Rechte.");
	} 
});