const fetchMock = jest
  .spyOn(global, "fetch")
  .mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );

describe("withFetch", () => {
  test("works", async () => {
    const json = await withFetch();

    // highlight-start
    expect(fetchMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // highlight-end

    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(0);
  });
});
