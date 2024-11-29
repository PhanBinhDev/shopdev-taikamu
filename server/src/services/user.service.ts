import bcrypt from 'bcrypt'
import { db } from '~/lib/db'
import { BadRequestError } from '~/core/error.response'
import { IUserDTO } from '~/dtos/user.dto'
import { SALTS } from '~/constants'
import { getInfoData } from '~/utils'
import { generateToken } from '~/utils/auth'

class UserService {
  static createUser = async (data: IUserDTO) => {
    const { email, name, password, role, imageUrl } = data
    const holderUser = await db.user.findFirst({
      where: {
        email
      }
    })

    if (holderUser) {
      throw new BadRequestError({
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, SALTS)
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        imageUrl
      }
    })

    const payload = getInfoData({
      fields: ['id', 'email'],
      object: user
    })

    const tokens = generateToken(payload)

    return {
      user: getInfoData({
        fields: ['id', 'name', 'email', 'role', 'imageUrl'],
        object: user
      }),
      tokens
    }
  }
}

export default UserService
