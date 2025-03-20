// i love hardcoding data
interface Location {
    x: number;
    y: number;
}

export const MAP_WIDTH = 4205;
export const MAP_HEIGHT = 3557;

export const LocationsMap: Record<string, Location> = {
    'Xalos': { x: 2110, y: 2167 },
    'Caecavel': { x: 1697, y: 2472 },
    'Sitiuya': { x: 2206, y: 2777 },
    'Liligan': { x: 2321, y: 2811 }
}