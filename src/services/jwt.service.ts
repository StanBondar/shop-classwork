import { sign, verify } from 'jsonwebtoken';
import { pick } from 'lodash';
import { EnvConfig } from '../config';
import { UserEntity } from '../db/entities/user.entity';
import { HttpError } from '../helpers/wrapper.helper';
import { JwtPayload } from '../types';

class JwtService {
  decodeToken(authHeader: string) {
    const token = (authHeader || '').split(' ')[1];

    const { id } = this.decode(token);

    return UserEntity.findOne(id);
  }

  decode(token: string) {
    return verify(token, EnvConfig.SECRET_KEY) as JwtPayload;
  }

  encode(data: JwtPayload | UserEntity) {
    return sign(pick(data, 'login', 'id', 'role'), EnvConfig.SECRET_KEY, {
      expiresIn: '4h',
    });
  }

  async login({ password, login }: { password: string; login: string }) {
    const user = await UserEntity.findOne(
      { login },
      { select: ['password', 'id'] }
    );

    if (!user || !user.verifyPassword(password)) {
      throw new HttpError('Wrong credentials', user ? 400 : 404);
    }
    await user.reload();

    return this.encode(user);
  }
}

export default new JwtService();
