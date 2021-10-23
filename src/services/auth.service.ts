import { config } from 'dotenv';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from '../types';

config();
class JwtService {
  private readonly secretKey;

  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  decode(token: string) {
    return verify(token, this.secretKey) as JwtPayload;
  }

  encode(data: JwtPayload) {
    return sign(data, this.secretKey, { expiresIn: '4h' });
  }
}

export default new JwtService();
