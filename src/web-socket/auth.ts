import { Socket } from 'socket.io';
import { UserEntity } from '../db/entities/user.entity';
import JwtService from '../services/jwt.service';

export const authSocketMiddleware = async (socket: Socket, next: Function) => {
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