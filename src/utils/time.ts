import { EMPTY_STRING } from '../../assets/constants/common';

/**
 * Преобразовать iso дату в формат hh:mm
 * @param isoDate
 * @returns
 */
export const getLocaleTime = (isoDate: string): string => {
  if (!isoDate) {
    return EMPTY_STRING;
  }

  const date = new Date(isoDate);
  if (date) {
    const result = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    return result;
  }
  return EMPTY_STRING;
};

export function isSameDay(firstDate: Date, secondDate: Date): boolean {
  return firstDate.getFullYear() === secondDate.getFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getDate() === secondDate.getDate();
}

/**
 * Преобразовать iso дату в формат hh:mm или день недели или dd.mm.yyyy, в зависимости от условий
 * @param isoDate
 * @returns
 */
export const getDate = (isoDate: string): string => {
  if (!isoDate) {
    return EMPTY_STRING;
  }

  const date = new Date(isoDate);
  const now = new Date();

  // Проверка на сегодняшний день
  if (isSameDay(date, now)) {
    return getLocaleTime(isoDate);
  }

  // Проверка на вчерашний день или текущую неделю
  const dayDifference = Math.ceil((Number(now) - Number(date)) / (1000 * 60 * 60 * 24));
  if (dayDifference === 1) {
    return 'Вчера';
  }
  if (dayDifference <= 7) {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' });
  }

  // Более поздняя дата
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
