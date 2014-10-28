var timeLeft = 3600000;

Meteor.methods({

    timerClock: function() {
        var start = new Date().getTime(),
        elapsed = '0.0';

        setInterval(function() {

            var time = new Date().getTime() - start;

            elapsed = Math.floor(time / 100) / 10;
            if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

            timeLeft -= elapsed;

            console.log(timeLeft);

        }, 100);

    },
    howMuchTime: function() {

        if (timeLeft < 0) {
            return timeLeft.toString();
        }
        else {
            return "Pause";
        }

    }
});