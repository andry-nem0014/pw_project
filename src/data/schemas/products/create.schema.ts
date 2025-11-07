import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productSchema } from "./product.schema.ts";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Product", ...obligatoryRequredFields],
};
