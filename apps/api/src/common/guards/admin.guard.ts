import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

// Runs after ClerkAuthGuard — expects request.user.clerkId to already be set,
// then checks the corresponding User has role ADMIN before allowing access.
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const clerkId: string | undefined = request.user?.clerkId;
    if (!clerkId) throw new ForbiddenException("Not authenticated");

    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user || user.role !== "ADMIN") throw new ForbiddenException("Admin access required");
    return true;
  }
}
