export const environment = {
  production: true,
  SETTINGS: {
    FIREBASE: {
      apiKey: $ENV.apiKey,
      authDomain: $ENV.authDomain,
      databaseURL: $ENV.databaseURL,
      projectId: $ENV.projectId,
      storageBucket: $ENV.storageBucket,
      messagingSenderId: $ENV.messagingSenderId,
      appId: $ENV.appId
    }
  }
};
