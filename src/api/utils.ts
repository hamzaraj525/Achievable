import moment from 'moment';
import { $tsMigrateAny } from '../types/types';

export type DefaultAPITransformationOverrides = {
  dateTransformOverrides?: DateTransformOverrideMap;
};
type DateTransformOverrideMap = {
  [propertyName: string]: (dateLike: $tsMigrateAny) => Date;
};
export function applyDefaultAPIResponseTransformations<T>(
  record: T,
  overrides: DefaultAPITransformationOverrides = {}
): T {
  try {
    return parseDates(record, undefined, overrides.dateTransformOverrides);
  } catch (error) {
    console.error('Parse error', error);
    return record;
  }
}

const toDate = (dateLike: $tsMigrateAny) => utcToSameDate(dateLike);

function parseDates<T>(
  obj: T,
  key?: string,
  transformOverrides: DateTransformOverrideMap = {}
): T {
  const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?/;

  if (typeof obj === 'string' && datePattern.test(obj)) {
    const transformer =
      !!key && key in transformOverrides ? transformOverrides[key] : toDate;

    const date = transformer(obj);

    if (!isNaN(date.getTime())) {
      return date as $tsMigrateAny;
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      // @ts-expect-error object crawling
      return obj.map(item =>
        parseDates(item, undefined, transformOverrides)
      ) as $tsMigrateAny[];
    } else {
      const parsedObj = Object.keys(obj).reduce((nextParsed, key) => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          nextParsed[key] = parseDates(
            // @ts-expect-error object crawler
            obj[key],
            key,
            transformOverrides
          );
        }

        return nextParsed;
      }, {} as Record<string, $tsMigrateAny>);

      return parsedObj as T;
    }
  }

  return obj;
}

export const utcToSameDate = (input: string | Date): Date => {
  if (typeof input === 'string' && input.includes('T')) {
    const dateOnlyString = input.split('T')[0];
    const ans = moment(dateOnlyString).toDate();
    return ans;
  }

  return new Date(input);
};
