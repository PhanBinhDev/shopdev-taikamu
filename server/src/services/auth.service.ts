import bcrypt from 'bcrypt'
import { db } from '~/lib/db'
import { AuthFailureError, NotFoundError } from '~/core/error.response'
import { IUserDTO } from '~/dtos/user.dto'
import { SALTS } from '~/constants'
import { getInfoData } from '~/utils'
import { generateToken } from '~/utils/auth'
import { ISignInDTO } from '~/dtos/auth.dto'

class AuthService {
  static signIn = async (data: ISignInDTO) => {
    const { email, password } = data

    const existUser = await db.user.findFirst({
      where: {
        email
      }
    })

    if (!existUser) {
      throw new AuthFailureError({ message: 'User not found' })
    }

    const matchedPassword = await bcrypt.compare(password, existUser.password)

    if (!matchedPassword) {
      throw new AuthFailureError({
        message: 'Invalid Credentials'
      })
    }

    const payload = getInfoData({
      fields: ['id', 'email'],
      object: existUser
    })

    const user = getInfoData({
      fields: ['id', 'name', 'email', 'role', 'imageUrl'],
      object: existUser
    })

    const tokens = generateToken(payload)

    return {
      user,
      tokens
    }
  }
  static signOut = async () => {}
}

export default AuthService
