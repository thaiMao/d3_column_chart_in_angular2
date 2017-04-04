import { Component, OnInit,
         Input } from '@angular/core';

@Component({
  selector: 'app-listing',
  template: `

      <md-list >
        <md-list-item *ngFor="let d of data">

          {{d.stock}}
          <span class="spacer"></span>
          {{d.price | currency:'GBP':true:'1.2-2'}}

        </md-list-item>
      </md-list>

  `,
  styles: [`

  .spacer {
    flex: 1 1 auto;
  }
  `]
})
export class ListingComponent implements OnInit {

  @Input('data') data;

  constructor() { }

  ngOnInit() { }

}
