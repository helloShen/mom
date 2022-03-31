import Controller from './controller';
import View from './view';
// eslint-disable-next-line no-unused-vars
import css from '../css/index.css';

(() => {
  Controller.showWeather('shanghai');
  Controller.showWeather('montreal');
  View.showFooter();
})();
