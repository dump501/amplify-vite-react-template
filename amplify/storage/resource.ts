import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "AmplifyBlogApp",
  access: (allow) => ({
    "profiles/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "posts/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
