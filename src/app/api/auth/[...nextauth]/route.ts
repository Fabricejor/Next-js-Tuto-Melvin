// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"
import { JWT } from "next-auth/jwt";


export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER
        })
    ],
    pages: {
        signIn: 'api/auth/signin',
        signOut: 'api/auth/signout',
      },
    session: {
        maxAge: 60 * 30
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
                return token
            }
            // we take a buffer of one minute(60 * 1000 ms)
            if (Date.now() < Number(token.expiresAt) * 1000 - 60 * 1000) {
                return token
            } else {
                try {
                    const response = await requestRefreshOfAccessToken(token)

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    const updatedToken: JWT = {
                        ...token, // Keep the previous token properties
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    }
                    return updatedToken
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }
        },
        // ...
    }
}
// src/app/api/auth/[...nextauth]/route.ts
function requestRefreshOfAccessToken(token: JWT) {
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string
        }).toString(),
        method: "POST",
        cache: "no-store"
    });
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }