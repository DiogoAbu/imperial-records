import { MainNavigationProp, MainStackParams, ResourceName, ResourceOne, ValueOf } from '!/types';

export default function pushNewDetailsScreen(
  route: keyof MainStackParams,
  resource: ResourceName,
  result: ValueOf<ResourceOne>,
  navigation: MainNavigationProp<'Details'>,
): () => void {
  return () => {
    requestAnimationFrame(() => {
      navigation.push(route, { resource, result });
    });
  };
}
