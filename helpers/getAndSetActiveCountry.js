import * as Cookie from 'js-cookie';
import {set, get} from 'lodash';

function getActiveCountry(nameCountryCookie, selectedAppId) {
  const cookie = Cookie.get('cabinet_country');
  if (cookie) {
    const cookieJS = JSON.parse(cookie);
    const pageCookie = get(cookieJS, `${nameCountryCookie}.${selectedAppId}`, '');
    return pageCookie ? pageCookie.toLowerCase() : '';
  }
  return '';
}

function removeParam(key, sourceURL) {
  let rtn = sourceURL.split('?')[0];
  let paramsArr = [];
  const queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    paramsArr = queryString.split('&');
    for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
      const param = paramsArr[i].split('=')[0];
      if (param === key) {
        paramsArr.splice(i, 1);
      }
    }
    rtn = `${rtn}?${paramsArr.join('&')}`;
  }
  return rtn;
}

function removeURLParameter(parameter) {
  let urlString = window.location.href;
  const url = new URL(window.location.href);
  if (url.searchParams.get(parameter)) {
    urlString = removeParam(parameter, urlString);
    window.history.pushState(null, '', urlString);
  }
}

function setActiveCountry(nameCountryCookie, selectedAppId, value) {
  const cabinetCookie = Cookie.get('cabinet_country');
  let cookieJS = {};
  if (cabinetCookie && cabinetCookie !== 'undefined') {
    cookieJS = JSON.parse(cabinetCookie);
  }
  set(cookieJS, `${nameCountryCookie}.${selectedAppId}`, value.toUpperCase());
  removeURLParameter('country');
  Cookie.set('cabinet_country', cookieJS);
}

function getWordCountSortProp(appOs, selectedPlatform) {
  let sortProp = 'androidVisibility';
  if (appOs === 'iOS') {
    sortProp = selectedPlatform.toLowerCase() === 'iphone' ? 'iphoneVisibility' : 'ipadVisibility';
  }
  return sortProp;
}

function getCountryList(advertiserCountryListArg, nameCountryCookie, activeApplication = {}, platform) {
  let countryList = [];
  if (activeApplication) {
    const selectedPlatform = activeApplication.platform === 'Android' ? 'Android' : 'iPhone';
    const word = getWordCountSortProp(activeApplication.platform, platform || selectedPlatform);

    const advertiserCountryList
      = advertiserCountryListArg.map((item) => ({ country: item.code, index: item[word] }));

    if (advertiserCountryList.length) {
      countryList = advertiserCountryList;
    }
  }

  let selectedCountry = getActiveCountry(nameCountryCookie, activeApplication.id);
  if (selectedCountry) {
    if (countryList.length > 0 && countryList.filter((item) => item.country.toLowerCase() === selectedCountry).length === 0) {
      selectedCountry = countryList[0].country.toLowerCase();
      setActiveCountry(nameCountryCookie, activeApplication.id, selectedCountry);
    }
    if (countryList.length === 0) {
      selectedCountry = '';
    }
  } else {
    selectedCountry = countryList && countryList.length > 0 && countryList[0].country.toLowerCase() || '';
  }

  return {
    countryList,
    selectedCountry,
  };
}

export { getActiveCountry, setActiveCountry, getCountryList };
