playerCount = new Mongo.Collection('playerCount');

Meteor.methods({
	addPlayer: function(attr) {
		var user = Meteor.user(),
			userWithSameKrz = playerCount.findOne({krz: attr.krz});

		if (user.profile.isAdmin === 0)
			throwError("Du hast nicht die benötigten Rechte, um einen Spieler anzulegen.")
	
		if (!attr.krz || !attr.aname || !attr.sname)
			throwError("Bitte gib alle Daten ein.");
		
		if (attr.url && userWithSameKrz)
			throwError("Unter diesem Kürzel ist bereits ein/e Spieler/in vorhanden.");
		
		var post = _.extend(_.pick(attr, 'aname', 'sname', 'krz', 'username'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});
		var postId = playerCount.insert(post);
			return postId;
	},
	removePlayer: function(attr) {
		var user = Meteor.user();

		if (user.profile.isAdmin === 0)
			throwError("Du besitzt nicht die benötigten Rechte.")

		var spielerId = playerCount.remove(attr);
				return spielerId;
	}
});