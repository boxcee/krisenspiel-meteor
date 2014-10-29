Template.publicActions.helpers({
    publicAction: function() {

        return playerActions.find({status: "yes", hidden: 0}, {sort: {time: 1}});

    },
    actorsString: function() {

        var str = "";

        var o = this;

        if (this.actors[0].length < 1)

            str = this.initiator;

        else

            str = this.initiator + ", " + this.actors.join(', ');

        return str;

    }
});