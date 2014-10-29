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