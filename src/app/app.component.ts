import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/interval';
import 'rxjs/add/Observable/Of';
import 'rxjs/add/Operator/switchMap'


@Component({
  selector: 'app-root',
  template: `

  <md-toolbar class="bar">
  <span class="icon"><md-icon>trending_up</md-icon></span>
  <span>Stock Prices</span>

  </md-toolbar>

  <div class="container content">
    <div class="row">
      <div class="col-md-6">
        <md-card class="card">
          <md-card-header>
            <md-card-title>Current share price</md-card-title>
            <md-card-subtitle>Retail sector</md-card-subtitle>
          </md-card-header>

          <md-card-content>
            <app-column-chart
            [data]="data">
            </app-column-chart>
          </md-card-content>

        </md-card>
      </div>

      <div class="col-md-6">
        <md-card class="card">
          <md-card-header>
            <md-card-title>Current share price</md-card-title>
            <md-card-subtitle>Retail sector</md-card-subtitle>
          </md-card-header>

          <md-card-content>
          <app-listing
          [data]="data"></app-listing>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>

  `,
  styles: [`
  .content {
    margin-top: 8px;
    padding-top: 8px;
  }
  .card {
    margin: 8px;
  }

  .list {

  }
  .bar {
    background-color: #FF9800;
  }
  .icon {
    margin-right: 20px;
  }

  @media (min-width: 990px) {
  .card {
    min-height: 460.8px;
  }
}


  `]
})
export class AppComponent {
  data: any;

  ngOnInit() {

    Observable.interval(1200)
              .switchMap(() => {
                return Observable.of([
                  { price: 1.85+(0.20*Math.random()), stock: "TSCO" },
                  { price: 2.64+(0.10*Math.random()), stock: "SBRY" },
                  { price: 2.80-(0.70*Math.random()), stock: "MRW" }
                ])
              })
              .subscribe(_data => this.data =_data,
                         err => console.log('Error', err))
  }
}
