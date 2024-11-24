import winston from 'winston'
import path from 'path'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]:: ${info.message}`
  )
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/error.log'),
    level: 'error'
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/http.log'),
    level: 'http'
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/info.log'),
    level: 'info'
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/debug.log'),
    level: 'debug'
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/warn.log'),
    level: 'warn'
  })
]

const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  levels,
  format,
  transports
})

export default Logger
