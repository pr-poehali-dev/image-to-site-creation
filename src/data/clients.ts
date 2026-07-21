export interface ClientItem {
  name: string;
  logo: string;
  industry: string;
  description: string;
  solutions: string[];
}

// Шаблон — сюда добавляем реальных клиентов: логотип, описание компании
// и какие доработки/программы на базе 1С мы для них делали.
export const clients: ClientItem[] = [];
