function isAdmin() {
	var user = Meteor.user();
	return user.profile.isAdmin === true;
}

function isPlayer() {
	var user = Meteor.user();
	return user.profile.isAdmin === false;
}

Accounts.config({
	forbidClientAccountCreation : true
});