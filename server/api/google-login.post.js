import { OAuth2Client } from "google-auth-library";
const config = useRuntimeConfig()
const googleId = config.googleClientId
const client = new OAuth2Client(googleId)

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const token = body.token
    return verify(token).catch(console.error)
})

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    return ticket.getPayload();
    // const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}