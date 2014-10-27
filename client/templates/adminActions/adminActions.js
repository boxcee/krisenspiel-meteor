Template.actionsToEdit.helpers({
    actionToEdit: function() {

        return playerActions.find({}, {sort: {time: 1}});

    },
    actionStatus: function() {

        if (this.status === "pending")
            return "background-color: #31B0D5; color: white;";
        else if (this.status === "yes")
            return "background-color: #449D44; color: white;";
        else if (this.status === "no")
            return "background-color: #C9302C; color: white;";
        else if (this.status === "maybe")
            return "background-color: #EC971F; color: white;";

    },
    isHidden: function() {

        return this.hidden === 1;

    }
});