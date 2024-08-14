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
        token.username = profile.login;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.name = token.name;
      return session;
    },
  },
});
