import { ResourceName } from '!/types';

export default function resourceToSingular(resource: ResourceName): string {
  switch (resource) {
    case 'films':
      return 'film';
    case 'species':
      return 'species';
    case 'starships':
      return 'starship';
    case 'vehicles':
      return 'vehicle';
    case 'people':
      return 'person';
    case 'planets':
    default:
      return 'planet';
  }
}
