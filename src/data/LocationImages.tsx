import GadeshireImage from '../images/locations/Gadeshire.jpg';
import XalosImage from '../images/locations/Xalos.jpg';
import BegreyckImage from '../images/locations/Begreyck.jpg';
import CaecavelImage from '../images/locations/Caecavel.jpg';
import DertonaImage from '../images/locations/Dertona.jpg';
import DilabonImage from '../images/locations/Dilabon.jpg';
import HillscordImage from '../images/locations/Hillscord.jpg';
import IrcachiImage from '../images/locations/Ircachi.jpg';
import KelidelImage from '../images/locations/Kelidel.jpg';

// default fallback image
import pirateMapImage from '../images/pirate-map.jpg';

export const locationImages: Record<string, string> = {
    'Gadeshire': GadeshireImage,
    'Xalos': XalosImage,
    'Begreyck': BegreyckImage,
    'Caecavel': CaecavelImage,
    'Dertona': DertonaImage,
    'Dilabon': DilabonImage,
    'Hillscord': HillscordImage,
    'Ircachi': IrcachiImage,
    'Kelidel': KelidelImage,
};

export function getLocationImage(locationName: string): string {
    return locationImages[locationName] || pirateMapImage;
}