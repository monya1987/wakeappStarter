const Langs = {
  cn: 'zh',
  ca: 'en',
  by: 'be',
  ua: 'uk',
  kz: 'kk',
  gb: 'en',
  au: 'en',
  se: 'sv',
  dk: 'da',
  at: 'de',
  sg: 'ms',
  mx: 'es',
  in: 'hi',
  tn: 'ar',
  il: 'he',
  nz: 'en',
  jp: 'ja',
  vn: 'vi',
  ie: 'en',
  ch: 'cs',
  ae: 'ar',
  my: 'ms',
  us: 'en',
};

function getActiveLangForCountry(value) {
  return Langs[value] || value;
}

export default getActiveLangForCountry;
