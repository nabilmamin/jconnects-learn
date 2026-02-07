import { getTableName, getTableNamesForVenue } from './table-names';

describe('getTableName', () => {
  test('returns first color for index 0', () => {
    const result = getTableName(0);
    expect(result).toBe('Table Crimson');
  });

  test('returns correct color for other indexes', () => {
    expect(getTableName(1)).toBe('Table Amber');
    expect(getTableName(4)).toBe('Table Violet');
  });

  test('wraps around with suffix when pool is exhausted', () => {
    // There are 30 names, so index 30 wraps to first name with suffix
    expect(getTableName(30)).toBe('Table Crimson 2');
    expect(getTableName(31)).toBe('Table Amber 2');
  });

  test('continues incrementing suffix for very large indexes', () => {
    expect(getTableName(60)).toBe('Table Crimson 3');
  });
});

describe('getTableNamesForVenue', () => {
  test('returns empty array for count 0', () => {
    expect(getTableNamesForVenue(0)).toEqual([]);
  });

  test('returns correct number of names', () => {
    const names = getTableNamesForVenue(3);
    expect(names).toHaveLength(3);
  });

  test('returns names in order', () => {
    const names = getTableNamesForVenue(3);
    expect(names).toEqual([
      'Table Crimson',
      'Table Amber',
      'Table Sapphire',
    ]);
  });

  test('all names are unique even past pool size', () => {
    const names = getTableNamesForVenue(35);
    const unique = new Set(names);
    expect(unique.size).toBe(35);
  });
});
