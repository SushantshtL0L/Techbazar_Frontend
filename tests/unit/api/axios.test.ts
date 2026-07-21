describe("axios client configuration", () => {
  const originalBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  afterEach(() => {
    jest.resetModules();
    if (originalBaseUrl === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = originalBaseUrl;
    }
  });

  it("uses a relative base URL when no API base URL is configured", () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    jest.isolateModules(() => {
      const axiosInstance = require("../../../lib/api/axios").default;
      expect(axiosInstance.defaults.baseURL).toBe("");
    });
  });
});
