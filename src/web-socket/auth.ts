import { Socket } from 'socket.io';
import { UserEntity } from '../db/entities/user.entity';
import JwtService from '../services/jwt.service';
import { HttpError } from '../tools/wrapper.helpers';

export const authSocketMiddleware = async (socket: Socket, next: Function) => {
  const {token} = socket.handshake.auth;
  try {
    const {id} = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    if(!user){
      throw new HttpError('User not found', 401);
    }
    socket.data.user = user;
    next();
  }catch (err) {
    next(err);
  }
}