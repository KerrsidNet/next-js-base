import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Creates a Winston logger instance with daily log file rotation and 
 * console logging.
 * 
 * Transports:
 * - DailyRotateFile: Rotates logs daily, with options for max file size and retention.
 * - Console: Logs to console, with level set by LOG_LEVEL env var.
 * 
 * Formatting:
 * - Combines timestamp, log level, error stacks, splats, and custom message format.
 * - Includes service name metadata.
 * 
 * In production, only DailyRotateFile is used. In development, Console is added.
 */
const getLogger = () => {
    const fileLogTransport = new transports.DailyRotateFile({
        filename: `logs/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
    });

    const consoleTransport = new transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: false,
        json: false,
        colorize: true,
        format: format.printf((i) => `${i.message}`),
    });

    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.printf(
                ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
                    `${timestamp} [${label}] ${level}: ${message}`
            )
        ),
        defaultMeta: { service: 'my-app' },
        transports: [consoleTransport],
    });

    if (process.env.NODE_ENV === 'development') {
        logger.add(fileLogTransport);
    }

    return logger;
};

export default getLogger();