import { Alert, Linking } from 'react-native';

export default async function openUrl(url: string): Promise<void> {
  try {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      throw new Error();
    }

    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } catch {
    Alert.alert(`We don't know how to open this URL: ${url}`);
  }
}
