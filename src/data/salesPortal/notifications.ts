export enum NOTIFICATIONS {
  PRODUCT_CREATED = "Product was successfully created",
  PRODUCT_DELETED = "Product was successfully deleted",
}

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Not authorized",
  PRODUCT_NOT_FOUND: (id: string) => `Product with id '${id}' wasn't found`,
  PRODUCT_ALREADY_EXISTS: (name: string) => `Product with name '${name}' already exists`,
  INCORRECT_REQUEST_BODY: "Incorrect request body",
};
