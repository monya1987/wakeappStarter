function getWordCountSortProp(appOs, selectedPlatform) {
  let sortProp = 'wordCountAndroid';
  if (appOs === 'iOS') {
    sortProp = selectedPlatform.toLowerCase() === 'iphone' ? 'wordCountIphone' : 'wordCountIpad';
  }
  return sortProp;
}

export default function getAnotherCountriesWithTraffic(activeApplication, countryList, platform) {
  if (activeApplication && activeApplication.availableCountryList) {
    const selectedPlatform = activeApplication.platform === 'Android' ? 'Android' : 'iPhone';
    const wordCountSortProp = getWordCountSortProp(activeApplication.platform, platform || selectedPlatform);

    return activeApplication.availableCountryList.filter((item) =>
      item[wordCountSortProp] > 0
      &&
      countryList.find((elem) => elem.country === item.code) === undefined);
  }

  return [];
}
