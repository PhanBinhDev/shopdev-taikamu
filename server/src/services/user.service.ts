import bcrypt from 'bcrypt'
import { CreateUserDto } from '~/dtos/CreateUser.dto'
import { db } from '~/lib/db'
import { BadRequestError } from '~/utils/errors'

class UserService {
  registerUser = async (body: CreateUserDto) => {
    const foundUser = await db.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (foundUser) {
      throw new BadRequestError(
        `User with email: ${body.email} already registered'`
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    const user = await db.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        imageUrl: body.imageUrl || null
      }
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      role: user.role,
      isActive: user.isActive
    }
  }
}

export default new UserService()
