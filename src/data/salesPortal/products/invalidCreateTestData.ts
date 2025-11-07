export const invalidTestData = {
  name: {
    nameTwoSpase: "Test Product name",
    lessLengthName: "ab",
    highLengthName: "adasdjbashdasghdgasabsdbasdbhasdhbasddbab",
  },
  price: {
    zeroPrice: 0,
    negativePrice: -1,
    highPrice: 999999,
    fractionalPrice: 99.99,
  },
  amount: {
    negativeAmount: -1,
    fractionalAmount: 99.99,
    highAmount: 999999,
  },
  notes: {
    highNotes:
      "adasdjbashdasghdgasabsdbasdbhasadasdasdasddhbasddba768 8asdjashdjasdjhasdd89as9d8as 98as0d89d^%^%$das a0-090-90a9-0a09s9909-88776788789789dasdasmdkhqawhdaskd jkahdahsgdjhashdagshdgajsd766a7s5d6as87dhasdjkhajksdhasd89a89s7d98asdhjkajskdhkashdakjshdakjshdasdjhdkh",
    invalidSimbolNotes: "asdasdasd<>",
  },
};
