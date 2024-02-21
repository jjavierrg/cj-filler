/**
 * Generates a random name.
 * @returns A random name.
 */
export function generateRandomName(): string {
  const names = [
    'Juan',
    'Maria',
    'Pedro',
    'Ana',
    'Luis',
    'Laura',
    'Carlos',
    'Sofia',
    'Miguel',
    'Isabella',
    'Javier',
    'Valentina',
    'Diego',
    'Camila',
    'Alejandro',
    'Lucia',
    'Andres',
    'Emma',
    'Gabriel',
    'Martina',
    'Daniel',
    'Sara',
    'Jose',
    'Julia',
    'Fernando',
    'Paula',
    'Ricardo',
    'Valeria',
    'Hugo',
    'Carolina',
    'Sebastian',
    'Antonia',
    'Emilio',
    'Victoria',
    'Francisco',
    'Daniela',
    'Jorge',
    'Mariana',
    'Rafael',
    'Adriana',
    'Alberto',
    'Gabriela',
    'Mario',
    'Natalia',
    'Roberto',
    'Catalina',
    'Gonzalo',
    'Elena',
    'Ignacio',
    'Olivia',
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

/**
 * Generates a random surname.
 * @returns A random surname.
 */
export function generateRandomSurname(): string {
  const surnames = [
    'Gonzalez',
    'Rodriguez',
    'Lopez',
    'Martinez',
    'Perez',
    'Gomez',
    'Fernandez',
    'Sanchez',
    'Romero',
    'Torres',
    'Suarez',
    'Vargas',
    'Ramos',
    'Mendoza',
    'Castro',
    'Ortega',
    'Silva',
    'Hernandez',
    'Chavez',
    'Guerrero',
    'Medina',
    'Vega',
    'Rojas',
    'Navarro',
    'Cortes',
    'Morales',
    'Campos',
    'Vargas',
    'Molina',
    'Delgado',
    'Cruz',
    'Soto',
    'Orozco',
    'Vasquez',
    'Reyes',
    'Jimenez',
    'Gallardo',
    'Rios',
    'Valenzuela',
    'Maldonado',
    'Pena',
    'Villalobos',
    'Cabrera',
    'Aguilar',
    'Miranda',
    'Serrano',
    'Pacheco',
    'Castaneda',
    'Carrillo',
    'Fuentes',
    'Valdes',
    'Herrera',
  ];
  const randomIndex = Math.floor(Math.random() * surnames.length);
  return surnames[randomIndex];
}

/**
 * Generates a random email.
 * @returns A random email.
 */
export function generateRandomEmail(): string {
  const randomName = generateRandomName().toLowerCase();
  const randomSurname = generateRandomSurname().toLowerCase();

  return `${randomName}.${randomSurname}@fromIT.com`;
}

/**
 * Generates a random birth date.
 * @param options The options to generate the birth date.
 * @param options.minAge The minimum age of the person.
 * @param options.maxAge The maximum age of the person.
 * @returns A random birth date.
 */
export function generateRandomBirthDate(options: { minAge?: number; maxAge?: number } = {}): Date {
  const minAge = options.minAge || 18;
  const maxAge = options.maxAge || 65;

  const now = new Date();
  const minDate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
  const maxDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());

  const randomTimestamp = Math.floor(Math.random() * (maxDate.getTime() - minDate.getTime())) + minDate.getTime();
  return new Date(randomTimestamp);
}

/**
 * Generates a random birth date.
 * @param options The options to generate the birth date.
 * @param options.minAge The minimum age of the person.
 * @param options.maxAge The maximum age of the person.
 * @returns A random birth date in string format dd/MM/yyyy.
 */
export function generateRandomStringBirthDate(options: { minAge?: number; maxAge?: number } = {}): string {
  const birthDate = generateRandomBirthDate(options);
  return birthDate.toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

/**
 * Generates a random telephone number. (9 digits starting with 6)
 * @returns A random telephone.
 */
export function generateRandomTelephone(): string {
  const randomTelephone = Math.floor(Math.random() * 100000000) + 600000000;
  return randomTelephone.toString();
}

/**
 * Generates a random spanish Id.
 * @returns A random DNI.
 */
export function generateRandomDNI(): string {
  const dni = Math.floor(Math.random() * 100000000);
  const dniLetter = getDNILetter(dni);
  return `${dni}${dniLetter}`;
}

function getDNILetter(dni: number): string {
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const dniLetter = dniLetters.charAt(dni % 23);
  return dniLetter;
}

/**
 * Generates a date in string format
 * @param options The options to generate the date.
 * @param options.addDays The number of days to add to the current date.
 * @param options.format The format of the date.
 * @param options.format.locales The locales of the date.
 * @param options.format.options The options of the date.
 * @returns A date in string format
 */
export function generateStringDate(options: { addDays?: number; format?: { locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions} } = {}): string {
  const now = new Date();
  const addDays = options.addDays || 0;
  const format = options.format || {locales: 'es-ES', options: { month: '2-digit', day: '2-digit', year: 'numeric' }};
  now.setDate(now.getDate() + addDays);
  return now.toLocaleDateString(format.locales, format.options);
}