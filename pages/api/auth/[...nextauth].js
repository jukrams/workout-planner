// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     process.env.VERCEL_ENV === "preview"
//       ? CredentialsProvider({
//           name: "credentials",
//           credentials: {
//             username: {
//               label: "Username",
//               type: "text",
//               placeholder: "username",
//             },
//             password: { label: "Password", type: "password" },
//           },
//           async authorize(credentials) {
//             if (
//               credentials.username === "tester" &&
//               credentials.password === "workout"
//             ) {
//               return {
//                 name: "Workout Fan",
//                 email: "test@example.com",
//                 id: "a1b2c3d4",
//               };
//             } else {
//               return null;
//             }
//           },
//         })
//       : GithubProvider({
//           clientId: process.env.GITHUB_CLIENT_ID,
//           clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         }),
//   ],
// });

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (
              credentials.username === "tester" &&
              credentials.password === "workout"
            ) {
              // Wenn die Anmeldeinformationen korrekt sind, gib die Benutzerinformationen zurück
              return {
                name: "Workout Fan",
                email: "test@example.com",
                id: "a1b2c3d4", // Benutzerdefinierte ID
              };
            } else {
              // Rückgabe von null, wenn die Anmeldeinformationen falsch sind
              return null;
            }
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          profile(profile) {
            // Hier wird die GitHub ID und andere Profilinformationen zurückgegeben
            return {
              id: profile.id, // GitHub ID
              name: profile.name || profile.login,
              email: profile.email,
              image: profile.avatar_url,
            };
          },
        }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Füge die ID zur Session hinzu, damit sie im Frontend verfügbar ist
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      // Falls `user` vorhanden ist (d. h. beim ersten Login), speichere die ID im JWT-Token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
