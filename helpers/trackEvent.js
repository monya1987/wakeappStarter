import Amplitude from 'amplitude-js';

export function trackEvent(eventName, eventData, passGa, passYa) {
  try {
    Amplitude.logEvent(eventName, eventData);
    // window.amplitude.getInstance().logEvent(eventName, eventData);
  } catch (err) {
    // eslint-disable-next-line
    console.error('unable to send to Amplitude event', err);
  }
  if (passGa) {
    try {
      window.gtag('event', eventName, eventData);
    } catch (err) {
      // eslint-disable-next-line
      console.error('unable to send Google Analytics', err);
    }
    try {
      window.fbq('track', eventName, eventData);
    } catch (err) {
      // eslint-disable-next-line
      console.error('unable to send Facebook pixel', err);
    }
  }
  if (passYa) {
    try {
      window.yaCounterCustom.reachGoal(eventName, eventData);
    } catch (err) {
      // eslint-disable-next-line
      console.error('unable to send Yandex Metrics', err);
    }
  }
}
