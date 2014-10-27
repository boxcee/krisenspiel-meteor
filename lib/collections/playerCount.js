playerCount = new Mongo.Collection('playerCount');

Meteor.methods({
	addPlayer: function(attr) {
		var user = Meteor.user(),
			userWithSameKrz = playerCount.findOne({krz: attr.krz});

		if (!user)
			throw new Meteor.Error("Kein User", "Du must eingeloggt sein.");

		if (user.profile.isAdmin === 0)
			throw new Meteor.Error("User isPlayer", "Du hast nicht die benötigten Rechte.");
		else
			var playerId = Accounts.createUser(attr);
	
		if (!attr.krz || !attr.aname || !attr.sname)
			throw new Meteor.Error("Felder sind leer","Bitte gib alle Daten ein.");
		
		if (attr.url && userWithSameKrz)
			throw new Meteor.Error("Kürzel bereits vorhanden", "Unter diesem Kürzel ist bereits ein/e Spieler/in vorhanden.");
		
		var post = _.extend(_.pick(attr, 'aname', 'sname', 'krz', 'username'), {
			userId: playerId,
			author: user.username
		});

		var postId = playerCount.insert(post);

		return postId;
	},
	removePlayer: function(attr) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error("Kein User", "Du must eingeloggt sein.");

		if (user.profile.isAdmin === 0)
			throw new Meteor.Error("User isPlayer", "Du besitzt nicht die benötigten Rechte.");
		else
			Meteor.users.remove(attr.userId);

		var spielerId = playerCount.remove(attr);
				return spielerId;
	}
});