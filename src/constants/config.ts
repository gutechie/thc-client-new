export const config = Object.freeze({
  API: {
    // for server
    // "BASE_URL": "https://thehealthycomparison.com/api/v1",
    // for emulator
    // BASE_URL: "http://10.0.2.2:8000/api/v1",
    // for tunnel
    BASE_URL: "https://0a57-110-226-177-246.in.ngrok.io/api/v1",
  },
  "google fit": {
    issuer: "https://accounts.google.com",
    clientId:
      "517350807421-e782sd07levt5go145qgussrrmgf8lt8.apps.googleusercontent.com",
    redirectUrl:
      "com.googleusercontent.apps.517350807421-e782sd07levt5go145qgussrrmgf8lt8:/link",
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/fitness.activity.read",
    ],
  },
  google: {
    issuer: "https://accounts.google.com",
    clientId:
      "517350807421-e782sd07levt5go145qgussrrmgf8lt8.apps.googleusercontent.com",
    redirectUrl:
      "com.googleusercontent.apps.517350807421-e782sd07levt5go145qgussrrmgf8lt8:/link",
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/fitness.activity.read",
    ],
  },
  strava: {
    clientId: "83455",
    clientSecret: "0dda537f454660c7a993507a7fa820d11201c67d",
    redirectUrl:
      "com.googleusercontent.apps.517350807421-e782sd07levt5go145qgussrrmgf8lt8://link",
    serviceConfiguration: {
      authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
      tokenEndpoint:
        "https://www.strava.com/oauth/token?client_id=83455&client_secret=0dda537f454660c7a993507a7fa820d11201c67d",
    },
    scopes: ["activity:read_all"],
  },
});
