const error = `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.products index: added.seriya_1 dup key: { added.seriya: "SN_014500304P950191" }`;

const unhandledError =
  "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.products index: added.seriya_1 dup key";

const isError = error.includes(unhandledError);

console.log(isError);
