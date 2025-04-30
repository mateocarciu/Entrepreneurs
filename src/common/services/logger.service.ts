import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
    // Ici vous pourriez ajouter une logique pour sauvegarder les logs en DB
    // ou les envoyer à un service externe comme Sentry
  }

  warn(message: string) {
    super.warn(message);
  }

  log(message: string) {
    super.log(message);
  }
} 