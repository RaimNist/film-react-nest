import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class TskvLogger extends ConsoleLogger {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
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

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }
}
