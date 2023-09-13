import { NuxtAuthHandler } from '#auth'
const { passport } = useRuntimeConfig(); //get the values from the runtimeConfig

export default NuxtAuthHandler({
    secret: process.env.SECRET,
    // pages: {
    //     signIn: '/mastanah/login'
    // },
    providers: [
        {
            id: passport.mastanahCallbackUrl, //ID is only used for the callback URL
            name: "Mastanah App", // name is used for the login button
            type: "oauth", // connexion type
            version: "2.0",// oauth version
            authorization: {
                url: `${ passport.mastanahBaseUrl }/oauth/authorize`, // this is the route created by passport by default to get the autorization code
                params: {
                    scope: '*'
                }
            },
            token: {
                url: `${ passport.mastanahBaseUrl }/oauth/token`, // this is the default route created by passport to get and renew the tokens
            },
            clientId: passport.mastanahClientId, // the client Id
            clientSecret: passport.mastanahClientSecret,// the client secret
            userinfo: {
                url: `${ passport.mastanahBaseUrl }/api/v1/profile`,// this is a custom route that must return the current user that must be created in laravel
            },
            profile: (profile) => {
                // map the session fields with you laravel fields
                // profile is the user coming from the laravel app
                // update the return with your own fields names
                return {
                    id: profile.data.id,
                    name: profile.data.name,
                    email: profile.data.email,
                    image: profile.data.avatar_url,
                };
            },
            idToken: false,
        }
    ]
});
