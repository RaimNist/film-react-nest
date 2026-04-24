import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class JsonLogger extends ConsoleLogger {
  formatMessage(level: string, message: string, ...optionalParams: unknown[]) {
    return JSON.stringify({ level, message, optionalParams });
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
