import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class TskvLogger extends ConsoleLogger {
  formatMessage(level: string, message: string, ...optionalParams: unknown[]) {
    const timestamp = new Date().toISOString();
    const logMessage = {
      timestamp,
      level,
      message,
      ...(optionalParams.length > 0
        ? { optionalParams: JSON.stringify(optionalParams) }
        : {}),
    };
    return Object.entries(logMessage)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  log(message: string, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: string, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: string, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: string, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: string, ...optionalParams: unknown[]) {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }
}
