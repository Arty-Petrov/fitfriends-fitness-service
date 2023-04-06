import { UserAuthenticatedException } from '@fitfriends/exceptions';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../../config/jwt.config';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const authentication = this.getAuthentication(context);
    if (authentication) {
      try {
        const payload = this.jwtService.verify(authentication, {
          secret: this.jwtConfig.accessTokenSecret,
          ignoreExpiration: false,
        });
        if (payload) {
          throw new UserAuthenticatedException(
            payload['email'],
            authentication
          );
        }
      } catch (error) {
        if (error.message === 'jwt expired') {
          return true;
        }
        throw error;
      }
    }
    return true;
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context
        .switchToHttp()
        .getRequest()
        .get('Authorization')
        ?.replace('Bearer', '')
        .trim();
    }
    return authentication;
  }
}
