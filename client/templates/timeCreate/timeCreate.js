var zeitDep = new Tracker.Dependency();
var zeitValue;
var zeitInterval;

function uhrzeit() {
    var zeit = new Date();
    var std = zeit.getHours();
    var min = zeit.getMinutes();

    if (min < 10)
        min = "0" + min;

    zeitValue = std + ":" + min;
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

function timer() {

    var start = new Date().getTime(),
        elapsed = '0.0';

    setInterval(function() {

        var time = new Date().getTime() - start;

        elapsed = Math.floor(time / 100) / 10;
        if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

        document.title = elapsed;

    }, 100);

}