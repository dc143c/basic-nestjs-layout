import { User } from '@/shared/entities';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';

class AuthorizationHelper {
  private readonly userRepository: any = Repository<User>;

  constructor() {
    dotenv.config();
  }

  async EncryptPassword(password: string): Promise<string> {
    return await bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(password, salt);
    });
  }

  async ComparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default AuthorizationHelper;
