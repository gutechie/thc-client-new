export const config = Object.freeze({
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
