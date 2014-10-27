Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('startPage', {path: '/'});
  this.route('adminPlayer', {path: '/spielerverwaltung'});
  this.route('adminUser', {path: '/userubersicht'});
  this.route('playerAction', {path: '/handlungen'});
  this.route('adminActions', {path: '/handlungsverwaltung'});
});

var requireLogin = function(pause) {
  if (!Meteor.user()) {
    this.render('accessDenied');
    pause();
  }
};

var requireAdmin = function(pause) {
  var user = Meteor.user();
  if (!user.profile.isAdmin) {
    this.render('accessDeniedAdmin');
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireAdmin, {only: ['adminPlayer', 'adminUser']});