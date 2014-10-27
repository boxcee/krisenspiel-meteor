if (publicActions.find().count() === 0) {
  publicActions.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  publicActions.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  publicActions.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}

if (Meteor.isServer) {

  if (Meteor.users.find().count() === 0) {

    Accounts.createUser({
      username:'Boxcee',
      password:'krisenspiel',
      profile: {isAdmin: 1}
    });

    Accounts.createUser({
      username:'Bodo',
      password:'krisenspiel',
      profile: {isAdmin: 1}
    });

  }

}