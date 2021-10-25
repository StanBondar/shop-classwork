import { sign, verify } from 'jsonwebtoken';
import { pick } from 'lodash';
import { EnvConfig } from '../config';
import { UserEntity } from '../db/entities/user.entity';
import { JwtPayload } from '../types';
class JwtService {
  private readonly secretKey;

  constructor() {
    this.secretKey = EnvConfig.SECRET_KEY;
  }

  decode(token: string) {
    return verify(token, this.secretKey) as JwtPayload;
  }

  encode(data: JwtPayload | UserEntity) {
    return sign(pick(data, 'login', 'id', 'role'), this.secretKey, {
      expiresIn: '4h',
    });
  }
}

export default new JwtService();
