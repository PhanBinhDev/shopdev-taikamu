import { NextFunction, Response, Request } from 'express'
import JWT, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
  verify
} from 'jsonwebtoken'
import config from '~/configs/env.config'
import { asyncHandler } from './asyncHandler'
import { CookieOptions } from '~/types'
import { AuthFailureError } from '~/core/error.response'
import { db } from '~/lib/db'

// static generateTokenPair = async (payload, publicKey, privateKey) => {}
const generateToken = (
  payload: object
): {
  accessToken: string
  refreshToken: string
} => {
  const private_key = process.env.PRIVATE_KEY
  if (!private_key) {
    throw new Error('Missing private key')
  }
  const accessToken = JWT.sign(payload, private_key, {
    algorithm: 'RS256',
    expiresIn: config.ACCESS_TOKEN_EXPIRE
  })

  const refreshToken = JWT.sign(payload, private_key, {
    algorithm: 'RS256',
    expiresIn: config.REFRESH_TOKEN_EXPIRE
  })
  return { accessToken, refreshToken }
}

const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Lấy access_token từ cookie
    const accessToken = req.cookies?.access_token

    if (!accessToken) {
      return res.status(401).json({
        message: 'Authentication failed: Access token not found',
        code: 'ACCESS_TOKEN_NOT_FOUND' // Thêm mã lỗi cụ thể để FE xử lý
      })
    }

    // Kiểm tra xem PUBLIC_KEY đã được cung cấp trong môi trường hay chưa
    const publicKey = process.env.PUBLIC_KEY

    if (!publicKey) {
      console.error('Missing PUBLIC_KEY in environment variables')
      return res.status(500).json({
        message: 'Internal Server Error: Missing public key',
        code: 'MISSING_PUBLIC_KEY' // Mã lỗi để FE phân biệt lỗi server
      })
    }

    try {
      // Xác minh access_token
      const payload = verify(accessToken, publicKey, { algorithms: ['RS256'] })

      // Gán payload vào req.user để sử dụng ở các middleware/route handler khác
      req.user = payload as {
        id: string
        email: string
      }

      // Chuyển sang middleware/route handler tiếp theo
      next()
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Token hết hạn -> FE cần gọi API refresh token
        return res.status(401).json({
          message: 'Authentication failed: Token expired',
          code: 'TOKEN_EXPIRED' // FE sẽ nhận biết để gọi refresh token
        })
      } else if (error instanceof JsonWebTokenError) {
        // Token không hợp lệ
        return res.status(401).json({
          message: 'Authentication failed: Invalid token',
          code: 'INVALID_TOKEN' // FE sẽ hiểu token bị lỗi, cần sign out
        })
      } else {
        console.error('Unexpected error during token verification:', error)
        return res.status(500).json({
          message: 'Internal Server Error',
          code: 'TOKEN_VERIFICATION_ERROR' // Lỗi không xác định
        })
      }
    }
  }
)

const verifyRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refresh_token
    const deviceId = (req.headers['x-device-id'] as string) || undefined
    if (!refreshToken) {
      throw new AuthFailureError({ message: 'No refresh token provided' })
    }

    const publicKey = process.env.PUBLIC_KEY
    if (!publicKey) {
      throw new Error('Missing public key')
    }

    let decoded
    try {
      decoded = verify(refreshToken, publicKey, {
        algorithms: ['RS256']
      }) as JwtPayload
    } catch (err) {
      throw new AuthFailureError({ message: 'Invalid or expired token' })
    }

    const { id: userId } = decoded
    if (!userId || !deviceId) {
      throw new AuthFailureError({ message: 'Invalid token payload' })
    }

    const tokenRecord = await db.token.findFirst({
      where: {
        token: refreshToken,
        userId,
        deviceId,
        isActive: true
      }
    })

    if (!tokenRecord) {
      throw new AuthFailureError({ message: 'Token not found or revoked' })
    }

    // Kiểm tra user-agent
    const requestUserAgent = req.headers['user-agent']
    if (requestUserAgent !== tokenRecord.userAgent) {
      throw new AuthFailureError({ message: 'User-agent mismatch' })
    }
    // Kiểm tra IP (tuỳ chọn)
    const requestIp = req.ip
    if (tokenRecord.ipAddress && requestIp !== tokenRecord.ipAddress) {
      console.warn(
        `IP mismatch: expected ${tokenRecord.ipAddress}, got ${requestIp}`
      )
    }

    req.user = decoded as {
      id: string
      email: string
    }
    req.refreshToken = refreshToken

    next()
  }
)

const setCookies = ({ cookies, res }: CookieOptions) => {
  cookies.forEach((cookie) => {
    const {
      name,
      value,
      options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Default: 1 day
      }
    } = cookie

    res.cookie(name, value, {
      httpOnly: options.httpOnly,
      secure: options.secure,
      sameSite: options.sameSite,
      expires: options.expires
    })
  })
}

export { generateToken, authentication, setCookies, verifyRefreshToken }
