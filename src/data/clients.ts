export interface ClientItem {
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  description: string;
  solutions: string[];
}

// Сюда добавляем реальных клиентов: логотип, описание компании
// и какие доработки/программы на базе 1С мы для них делали.
export const clients: ClientItem[] = [
  {
    name: 'VinylRussia',
    logo: 'https://cdn.poehali.dev/projects/1455fd36-fbcb-4859-af00-cd1d6a6e2240/bucket/cc7c5472-87e6-42d1-bbac-9d52dc68236a.png',
    website: 'https://vinylrussia.ru/',
    industry: 'Автомобильные плёнки',
    description: 'Крупнейший в России поставщик автомобильных виниловых и защитных плёнок.',
    solutions: ['1С:ERP', '1С:Зарплата и управление персоналом', '1С:Бухгалтерия', 'Битрикс24'],
  },
  {
    name: 'ООО «Полимер-коммерц»',
    logo: '/logos/polymer-commerce.png',
    website: 'http://polymercommerce.ru/',
    industry: 'Оптовая торговля',
    description: 'Оптовая торговля потребительскими товарами.',
    solutions: ['1С:Управление торговлей 11.5', '1С:Бухгалтерия'],
  },
  {
    name: 'ООО «АРАФ ТРЕЙД»',
    industry: 'Фармацевтика',
    description: 'Торговля оптовая фармацевтической продукцией.',
    solutions: ['1С:Комплексная автоматизация 2.5'],
  },
  {
    name: 'ООО «ДОБРОВЕТ»',
    logo: 'https://cdn.poehali.dev/projects/1455fd36-fbcb-4859-af00-cd1d6a6e2240/bucket/b8d1b980-c0a7-4657-aca3-9a3220fb80dc.png',
    website: 'https://dobrovet.ru/',
    industry: 'Ветеринария и фармацевтика',
    description: 'Ветеринарная сеть и торговля оптовая фармацевтической продукцией.',
    solutions: ['1С:Управление торговлей 11.5'],
  },
  {
    name: 'ООО «Стерильный»',
    website: 'https://sterilniy.ru/',
    industry: 'Медицинское оборудование',
    description: 'Торговля оптовая техникой, оборудованием и инструментами, применяемыми в медицинских целях.',
    solutions: ['1С:Комплексная автоматизация 2.5'],
  },
  {
    name: 'ООО «ЗЕВС»',
    industry: 'Производство электроники',
    description: 'Производство элементов электронной аппаратуры.',
    solutions: ['1С:Управление торговлей 11.5'],
  },
];