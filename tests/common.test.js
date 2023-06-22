import { rotate } from "../src/common";

test("test1", () => {
  const text = "あい\nうえお";
  const expected = "うあ\nえい\nお　";
  expect(rotate(text)).toBe(expected);
});
