import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";

export const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});
