import moment from 'moment-timezone';
import 'moment/locale/ru';

const {language = 'ru'} = window.INITIAL_STATE;

moment.locale(language);

export default moment;
