import { ResourceUrl } from '!/types';

export default function getNumberFromUrl(url: ResourceUrl): number {
  return parseInt(url.replace(/\D/g, ''), 10);
}
