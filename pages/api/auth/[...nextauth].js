import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (profile) {
        token.username = profile.login; // GitHub-Benutzername
        token.name = profile.name; // Vollständiger Name
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username; // Füge den Benutzernamen zur Session hinzu
      session.user.name = token.name; // Vollständigen Namen zur Session hinzufügen
      return session;
    },
  },
});
