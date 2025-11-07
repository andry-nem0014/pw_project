import { obligatoryFieldsSchema, obligatoryRequredFields } from "./core.schema";

export const userSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    username: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    roles: { type: "array", items: { type: "string" } },
    createdOn: { type: "string" },
  },
  required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
  additionalProperties: false,
};

export const loginSchema = {
  type: "object",
  properties: {
    User: userSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["User", ...obligatoryRequredFields],
};
