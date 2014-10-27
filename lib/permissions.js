isAdmin = function() {
	var user = Meteor.user();
	return user.profile.isAdmin == true;
},

isPlayer = function() {
	var user = Meteor.user();
	return user.profile.isAdmin == false;
}

Accounts.config({
	forbidClientAccountCreation : true
});