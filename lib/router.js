Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('startPage', {path: '/'});
  this.route('adminPlayer', {path: '/spielerverwaltung'});
  this.route('adminUser', {path: '/userubersicht'});
});