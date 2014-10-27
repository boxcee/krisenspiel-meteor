Template.playerOverview.helpers({
	player: function() {
		return playerCount.find({}, {sort: {krz: 1}});
	}
});

Template.addPlayer.events({
	'submit form': function(e) {
		e.preventDefault();

		var attributes = {
			username: $(e.target).find('[name=krz]').val().toUpperCase(),
			password: 'default',
			profile: {
				sname: $(e.target).find('[name=sname]').val(),
				aname: $(e.target).find('[name=aname]').val(),
				isAdmin: 0
			}
		}

		// Account für Spieler/in anlegen

		var userId = Meteor.call('makeUser', attributes);

		var spieler = {
			sname: $(e.target).find('[name=sname]').val(),
			aname: $(e.target).find('[name=aname]').val(),
			krz: $(e.target).find('[name=krz]').val().toUpperCase(),
			playerId: userId,
			username: $(e.target).find('[name=krz]').val().toUpperCase()
		}

		// Akteur/in anlegen

		Meteor.call('addPlayer', spieler);
	}
});

Template.playerName.events({
	'click .btn': function(e) {
		e.preventDefault();
		var geloscht = this

		Meteor.call('removePlayer', geloscht);

		Meteor.call('deleteUser', geloscht);
	}
});