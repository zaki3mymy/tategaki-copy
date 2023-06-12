const common = require("../src/common");

test("test1", () => {
  const text = "あい\nうえお";
  const expected = "うあ\nえい\nお　";
  expect(common.rotate(text)).toBe(expected);
});
