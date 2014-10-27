var zeitDep = new Tracker.Dependency();
var zeitValue;
var zeitInterval;

function uhrzeit() {
    var zeit = new Date();
    var std = zeit.getHours();
    var min = zeit.getMinutes();
    zeitValue = std + ":" + min
    zeitDep.changed();
};

Template.timeCreate.created = function() {
    uhrzeit();
    zeitInterval = Meteor.setInterval(uhrzeit, 1000);
};

Template.timeCreate.helpers({
    clock: function() {
        zeitDep.depend();
        return zeitValue;
    }
});

Template.timeCreate.destroyed = function() {
    Meteor.clearInterval(zeitInterval);
};