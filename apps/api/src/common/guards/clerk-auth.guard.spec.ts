import { UnauthorizedException } from "@nestjs/common";
import { ClerkAuthGuard } from "./clerk-auth.guard";

function contextWithHeaders(headers: Record<string, string>) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
    }),
  } as never;
}

describe("ClerkAuthGuard", () => {
  it("rejects requests with no bearer token", async () => {
    const guard = new ClerkAuthGuard();
    await expect(guard.canActivate(contextWithHeaders({}))).rejects.toThrow(UnauthorizedException);
  });

  it("rejects a malformed authorization header", async () => {
    const guard = new ClerkAuthGuard();
    await expect(
      guard.canActivate(contextWithHeaders({ authorization: "NotBearer abc123" })),
    ).rejects.toThrow(UnauthorizedException);
  });
});
