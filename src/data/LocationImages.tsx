// import gadeshireImage from '../images/locations/gadeshire.jpg';
// import xalosImage from '../images/locations/xalos.jpg';

// default fallback image
import pirateMapImage from '../images/pirate-map.jpg';

export const locationImages: Record<string, string> = {
    // 'Hasren': hasrenImage,
    // 'Verringen': verringenImage,
    // 'Gadeshire': gadeshireImage,
    // 'Xalos': xalosImage,
    // Add other locations here
};

export function getLocationImage(locationName: string): string {
    return locationImages[locationName] || pirateMapImage;
}