import bcrypt from 'bcrypt'
import { db } from '~/lib/db'
import { BadRequestError } from '~/core/error.response'
import { IUpdateProfileDTO, IUserDTO } from '~/dtos/user.dto'
import { SALTS } from '~/constants'
import { getInfoData } from '~/utils'
import { generateToken } from '~/utils/auth'
import { Request, Response } from 'express'

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
        object: user
      }),
      tokens
    }
  }
  static updateUser = async (
    data: IUpdateProfileDTO,
    req: Request,
    res: Response
  ) => {
    const { id } = req.user ?? {}
    const {
      email,
      name,
      password,
      imageUrl,
      gender,
      phoneNumber,
      birthDate,
      isActive
    } = data
    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new BadRequestError({
        message: 'User not found'
      })
    }

    const updateData = Object.fromEntries(
      Object.entries({
        email,
        name,
        password,
        imageUrl,
        gender,
        phoneNumber,
        birthDate,
        isActive
      }).filter(([_, value]) => value !== undefined)
    )

    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALTS)
      updateData.password = hashedPassword
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestError({
        message: 'No data provided to update'
      })
    }
    const updatedUser = await db.user.update({
      where: {
        id
      },
      data: updateData
    })

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
        object: updatedUser
      })
    }
  }
}

export default UserService
