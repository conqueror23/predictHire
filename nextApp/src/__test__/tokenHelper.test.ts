import { genToken, SECRETE_KEY, ifAdminToken} from "../utils";
import jwt from "jsonwebtoken";

describe("utils - tokenhelper test", () => {
  const mockData = { username: "ted", role: "admin" };
  let token: string;

  it("token verify process test", async () => {
    token = await genToken(mockData);
    const verifyRes = await jwt.verify(token, SECRETE_KEY);
    expect(verifyRes).toHaveProperty("role", "admin");
  });
  it("ifAdmin check test", async () => {
    const isAdmin = await ifAdminToken(token);
    expect(isAdmin).toBe(true);
  });
});
