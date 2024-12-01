import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import config from '~/configs/env.config'

import { ISignInDTO } from '~/dtos/auth.dto'

import { db } from '~/lib/db'
import { AuthFailureError } from '~/core/error.response'
import { getInfoData } from '~/utils'
import { generateToken, setCookies } from '~/utils/auth'

class AuthService {
  static signIn = async (data: ISignInDTO, res: Response, req: Request) => {
    const { email, password } = data

    // Track the current device
    const ipAddress = req.ip
    const deviceId = (req.headers['x-device-id'] as string) || 'Unknown'
    const userAgent = req.headers['user-agent'] || 'Unknown'

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

    // Save token to database
    await db.token.create({
      data: {
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: existUser.id,
        deviceId,
        ipAddress,
        userAgent
      }
    })
    setCookies({
      cookies: [
        {
          name: 'access_token',
          value: tokens.accessToken,
          options: {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
          }
        },
        {
          name: 'refresh_token',
          value: tokens.refreshToken,
          options: {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            sameSite: 'lax'
          }
        }
      ],
      res
    })

    return {
      user
    }
  }
  static signOut = async (req: Request, res: Response) => {
    // Thu hồi token phía server
    const token = req.cookies.refresh_token as string
    const deviceId = req.headers['x-device-id'] as string

    await db.token.update({
      where: {
        token,
        userId: req.user?.id,
        deviceId,
        isActive: true
      },
      data: {
        isActive: false
      }
    })

    // Thu hồi token phía client
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax' })
    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax' })
    res.clearCookie('x-device-id', { httpOnly: true })

    return {
      message: 'Logged out successfully'
    }
  }
  static refreshToken = async (res: Response, req: Request) => {
    const { id } = req.user ?? {}

    const existUser = await db.user.findUnique({
      where: {
        id
      }
    })
    if (!existUser) {
      throw new AuthFailureError({ message: 'User not found' })
    }

    const payload = getInfoData({
      fields: ['id', 'email'],
      object: existUser
    })
    const tokens = generateToken(payload)

    setCookies({
      cookies: [
        {
          name: 'access_token',
          value: tokens.accessToken,
          options: {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
          }
        }
      ],
      res
    })

    return {
      accessToken: tokens.accessToken
    }
  }
  static checkAuth = async (req: Request) => {
    const { id } = req.user ?? {}
    const existUser = await db.user.findUnique({
      where: {
        id
      }
    })
    if (!existUser) {
      throw new AuthFailureError({ message: 'User not found' })
    }
    return {
      user: getInfoData({
        fields: [
          'id',
          'name',
          'email',
          'imageUrl',
          'phoneNumber',
          'gender',
          'birthDate',
          'role',
          'isActive'
        ],
        object: existUser
      })
    }
  }
}

export default AuthService
