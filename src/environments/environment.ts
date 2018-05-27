// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDAIHaobtUPwhtCOgkTW3AdTa3pWJRunGE',
    authDomain: 'bossy-201421.firebaseapp.com',
    databaseURL: 'https://bossy-201421.firebaseio.com',
    projectId: 'bossy-201421',
    storageBucket: 'bossy-201421.appspot.com',
    messagingSenderId: '198419599773'
  }
};
