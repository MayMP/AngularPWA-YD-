// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = "http://localhost:8080";
const APIKey  = "7jfpo39kdqwe0welrge723lrf";
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBg1vcyVdahnIfL53llWfWj7wjiwG8r51U",
    authDomain: "yes-doc-9d2d9.firebaseapp.com",
    databaseURL: "https://yes-doc-9d2d9.firebaseio.com",
    projectId: "yes-doc-9d2d9",
    storageBucket: "",
    messagingSenderId: "129835749386",
    appId: "1:129835749386:web:fd0bccb01a734489ea4ff3",
    measurementId: "G-D41H9C6WWS"
  },
  baseUrl: baseUrl,
  APIKey: APIKey
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
