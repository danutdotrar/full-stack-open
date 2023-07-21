const listHelper = require("../utils/for_testing").dummy;

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper(blogs);
    expect(result).toBe(1);
});
