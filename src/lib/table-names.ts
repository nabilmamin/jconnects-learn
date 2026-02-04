// Table name pool - elegant color names for a dinner party vibe
const TABLE_NAMES = [
    'Crimson',
    'Amber',
    'Sapphire',
    'Emerald',
    'Violet',
    'Coral',
    'Ivory',
    'Slate',
    'Bronze',
    'Jade',
    'Scarlet',
    'Indigo',
    'Pearl',
    'Cobalt',
    'Marigold',
    'Onyx',
    'Teal',
    'Ruby',
    'Sage',
    'Plum',
    'Copper',
    'Azure',
    'Garnet',
    'Olive',
    'Champagne',
    'Charcoal',
    'Blush',
    'Navy',
    'Mint',
    'Burgundy',
];

/**
 * Get a table name for a specific venue on a specific date.
 *
 * @param tableIndex - Which table at this venue (0, 1, 2...)
 * @returns "Table Crimson", "Table Amber", or "Table Crimson 2" if pool exhausted
 */
export function getTableName(tableIndex: number): string {
    const poolSize = TABLE_NAMES.length;

    if (tableIndex < poolSize) {
        // Within pool - use name directly
        return `Table ${TABLE_NAMES[tableIndex]}`;
    } else {
        // Exceeded pool - add suffix
        const nameIndex = tableIndex % poolSize;
        const suffix = Math.floor(tableIndex / poolSize) + 1;
        return `Table ${TABLE_NAMES[nameIndex]} ${suffix}`;
    }
}

/**
 * Get table names for a venue.
 *
 * @param count - Number of tables at this venue
 * @returns Array of unique names for this venue
 */
export function getTableNamesForVenue(count: number): string[] {
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
        names.push(getTableName(i));
    }
    return names;
}
