import crypto from 'crypto'
import { NextFunction } from 'express'
import { HEADER } from '~/constants/header'
import { ForbiddenError } from './errors'

export class CryptoService {
  static generateKeyPair(): { privateKey: string; publicKey: string } {
    const privateKey = crypto.randomBytes(32).toString('hex')
    const publicKey = crypto
      .createHash('sha256')
      .update(privateKey)
      .digest('hex')
    return { privateKey, publicKey }
  }

  // Hash API key để lưu vào DB
  static hashApiKey(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex')
  }
}

export class ApiKeyService {
  static checkApiKey(req: Request, res: Response, next: NextFunction) {
    const key =
      req.headers[HEADER.API_KEY as keyof typeof req.headers]?.toString()

    if (!key) {
      return new ForbiddenError('Failed to check API key')
    }

    // const objKey = await findKeyByUserId(key)
  }
}
