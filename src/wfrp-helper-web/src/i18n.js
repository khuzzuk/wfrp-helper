import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';

export default i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: 'pl',
        fallbackLng: 'en',
        whitelist: ['en', 'pl'],
    });
