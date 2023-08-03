import User from '../models/users';

class AuthRepository {
  findByEmail = async (email: string) => {
    const findByEmailData = await User.findOne({
      where: { email },
    });
    return findByEmailData;
  };

  createUser = async (
    name: string,
    email: string,
    password: string,
    admin: boolean
  ) => {
    const createUserData = await User.create({
      name,
      email,
      password,
      point: 1000000,
      admin,
    });
    return createUserData;
  };
}

export default AuthRepository;
