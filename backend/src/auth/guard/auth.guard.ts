import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorator/roles.decorator.js";


export  class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector) {}
    canActivate(context : ExecutionContext): boolean{
        const role = this.reflector.get(Roles, context.getHandler());

        if (!role) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return role.includes(user.role)
    }
}