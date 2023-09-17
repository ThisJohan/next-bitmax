import axios from "@/lib/axios";

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsPovider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsPovider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "Otp", type: "text" },
      },
      async authorize(credentials, req) {
        return null;
      },
    }),
  ],
};
