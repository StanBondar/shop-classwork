import { UserEntity } from '../db/entities/user.entity';
import JwtService from '../services/jwt.service';

export const authSocketMiddleware = async (socket, next) => {
  const {token} = socket.handshake.auth;
  try {
    const {id} = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    socket.handshake.auth.user = user;
    next();
  }catch (err) {
    next(err);
  }
}