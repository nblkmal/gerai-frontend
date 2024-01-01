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
                return {
                    id: profile.data.id,
                    name: profile.data.name,
                    email: profile.data.email,
                    image: profile.data.avatar_url,
                    role: profile.data.role
                };
            },
            idToken: false,
        }
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    accessTokenExpires: account.expires_at,
                    user
                }
            }
            // @ts-ignore
            if (Date.now() < token.accessTokenExpires * 1000) {
                return token
            }

            // return await refreshAccessToken(token);
            // reference : https://stackoverflow.com/questions/75386754/sidebase-nuxt-auth-refresh-token-issue-with-laravel-passport
        },
        async session({session, token}) {
            // @ts-ignore
            session.user = token.user
            session.login_at = Date.now()
            // @ts-ignore
            session.access_token = token.access_token
            // @ts-ignore
            session.error = token.error
            return session
        }
    }
});

interface AuthResponse {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_at: number,
}
