# mom
![javascript](https://img.shields.io/badge/javascript-ES7-brightgreen) ![webpack](https://img.shields.io/badge/webpack-5.70.0-brightgreen) ![node.js](https://img.shields.io/badge/node.js-16.13.2-brightgreen) ![npm](https://img.shields.io/badge/npm-8.1.2-brightgreen) ![eslint](https://img.shields.io/badge/eslint-8.12.0-brightgreen) ![babel](https://img.shields.io/badge/babel-7.17.8-brightgreen) ![grid](https://img.shields.io/badge/grid-1.0-brightgreen) ![css3](https://img.shields.io/badge/css-3.0-brightgreen) ![html5](https://img.shields.io/badge/html-5.0-brightgreen) ![svg](https://img.shields.io/badge/svg-1.1-brightgreen)


Online Javascript weather app for my mom. Online preview: [ciaoshen.com/mom](http://ciaoshen.com/mom)

<img src="./src/assets/img/preview.png" width="500">

## OpenWeather API
Weather forcast data comes from [OpenWeather API](https://openweathermap.org/api). 

## Async JS
Using ES2017 `async` and `await`.

## MVC
This project is developed with MVC pattern. 

1. `model.js`: A DAO(Data Access Object) API. It's aware of the data structure.
2. `view.js`: All DOM manipulations go to this file. 
3. `controller.js`: A general manager. He is the only one who knows all the logic of different features. But he is blind from both data and DOM. `model.js` and `view.js` do these concrete tasks for him.

## Conclusion
Happy coding! I love you mom❤️