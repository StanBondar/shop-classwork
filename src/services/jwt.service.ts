import { sign, verify } from 'jsonwebtoken';
import { pick } from 'lodash';
import { EnvConfig } from '../config';
import { RefreshToken } from '../db/entities/refresh-token.entity';
import { UserEntity } from '../db/entities/user.entity';
import { JwtPayload } from '../types';
import ms from 'ms';

class JwtService {
  decode(token: string) {
    return verify(token, EnvConfig.SECRET_KEY) as JwtPayload;
  }

  encode(data: JwtPayload | UserEntity, exp: string) {
    return sign(pick(data, 'login', 'id', 'role'), EnvConfig.SECRET_KEY, {
      expiresIn: exp,
    });
  }

  async createTokenPair(data: JwtPayload | UserEntity) {
    const accessToken = this.encode(data, EnvConfig.ACCESS_TOKEN_EXP);

    const refreshToken = this.encode(data, EnvConfig.REFRESH_TOKEN_EXP);
    
    return {
      accessToken,
      refreshToken
    }
  }
}

export default new JwtService();