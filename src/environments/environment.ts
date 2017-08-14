// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBzhhCyShiJKYvY_5OJ7STdG24t6LN8_2c',
    authDomain: 'co-start-me.firebaseapp.com',
    databaseURL: 'https://co-start-me.firebaseio.com',
    projectId: 'co-start-me',
    storageBucket: 'co-start-me.appspot.com',
    messagingSenderId: '648357885133'
  }
};
