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
  this.route('publicActions', {path: '/offenehandlungen'});
});

var requireLogin = function(pause) {
  if (!Meteor.user()) {
    this.render('accessDenied');
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {except: ['startPage', 'publicActions']});