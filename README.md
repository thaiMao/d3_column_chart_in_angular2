This is an example of a column chart built with D3 and implemented in
an Angular 2 application.

![Alt text](stock_prices.gif?raw=true "Stock Prices Dashboard")

An Observable interval operator is used to mimic realtime data of stock prices.

The D3 column chart consumes the data, and reflects the changes in realtime.

Built with Angular CLI.

Responsive Layout

![Alt text](stock_prices_responsive.gif?raw=true "Stock Prices Responsive Layout")


$npm start or $ng serve

Known Issues.

Navigating away from the application and then returning sometimes results in a 'too late' error. This cause is related the code (within column-chart-component) violiating D3 transition lifecyles rules.

Further Improvements.

Abtract the data source to a service. Currently both child components make use of the same data source and more will be expected as new features are built. It would make sense to move the data to a service and inject the service into a parent component which passes the data along to it's child components.




# Ng2D3

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
