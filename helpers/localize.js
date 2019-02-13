import React, {Component} from 'react';

import en from '../translations/cabinet.en';
import ru from '../translations/cabinet.ru';
// import de from '../translations/cabinet.de';
// import cn from '../translations/cabinet.cn';

if (window.INITIAL_STATE) {
  const {language} = window.INITIAL_STATE;

  if (language === 'ru') {
    window.TRANSLATIONS = ru;
  } else if (language === 'en') {
    window.TRANSLATIONS = en;
  }
}

export default function localizeIntlDecorator(type) {
  return (Component) => {
    Component.intl = {};
    try {
      Component.intl = window.TRANSLATIONS[type][Component.name];
    } catch (err) {
      console.error('Component.intl error', err);
      console.error('Component.intl', Component.intl);
    }
    return Component;
  };
}
