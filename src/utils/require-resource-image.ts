import { ResourceName } from '!/types';

export default function requireResourceImage(resource: ResourceName): any {
  switch (resource) {
    case 'films':
      return require('!/assets/backgrounds/brian-mcgowan-oKl7Uhak54U-unsplash.jpg');
    case 'species':
      return require('!/assets/backgrounds/brian-mcgowan-SE5mmOZWqHE-unsplash.jpg');
    case 'starships':
      return require('!/assets/backgrounds/brian-mcgowan-yjOUm3zkRD0-unsplash.jpg');
    case 'vehicles':
      return require('!/assets/backgrounds/forde-studios-KHQMgfYwHWI-unsplash.jpg');
    case 'people':
      return require('!/assets/backgrounds/james-pond-XO9uCZZaipE-unsplash.jpg');
    case 'planets':
    default:
      return require('!/assets/backgrounds/martin-reisch-ddEBSlXB4YQ-unsplash.jpg');
  }
}
