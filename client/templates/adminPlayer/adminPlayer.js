Template.playerOverview.helpers({
	player: function() {
		return playerCount.find({}, {sort: {krz: 1}});
	}
});

Template.addPlayer.events({
	'submit form': function(e) {
		e.preventDefault();

		var attributes = {
			sname: $(e.target).find('[name=sname]').val(),
			aname: $(e.target).find('[name=aname]').val(),
			krz: $(e.target).find('[name=krz]').val().toUpperCase(),
			username: $(e.target).find('[name=krz]').val().toUpperCase(),
			password: 'default',
			profile: {
				sname: $(e.target).find('[name=sname]').val(),
				aname: $(e.target).find('[name=aname]').val(),
				isAdmin: 0
			}
		};

		Meteor.call('addPlayer', attributes, function(err, result) {
			if (err)
				alert(err.reason)
		});
	}
});

Template.playerName.events({
	'click .btn': function(e) {
		e.preventDefault();
		var geloscht = this;

		Meteor.call('removePlayer', geloscht, function(err, result) {
			if (err)
				alert(err.reason)
		});
	}
});