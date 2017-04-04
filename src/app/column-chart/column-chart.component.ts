import { Component, OnInit,
         ViewChild, ElementRef,
         AfterViewInit, Input,
         OnChanges } from '@angular/core';
const d3 = require('d3');

@Component({
  selector: 'app-column-chart',
  template: `
  <div *ngIf="!data">
    <md-spinner
    color="accent"
    class="spinner"></md-spinner>
  </div>
  <div #container></div>
  `,
  styles: [`
  .spinner {
    margin-left: 30%;
    margin-top: 10%;
  }

  `]
})
export class ColumnChartComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('container') container: ElementRef;
  @Input('data') data: any;
  host: any;
  margin: any;
  width: number;
  height: number;
  xScale: any;
  xAxis: any;
  yScale: any;
  yAxis: any;
  svg: any;
  t: any;
  update: any;

  constructor() { }

  ngOnInit() {

    this.margin = { top: 70, right: 20, bottom: 0, left: 40 };
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 450 - this.margin.top - this.margin.bottom;

    this.t = d3.transition()
               .duration(10);
  }

  ngAfterViewInit() {

    if(this.data === null || this.data === undefined) return;
    this.host = d3.select(this.getNativeElement(this.container));

    this.build();
  }

  ngOnChanges() {

    if(this.data === null || this.data === undefined) return;
    this.host = d3.select(this.getNativeElement(this.container));

    if(!this.svg) {
      this.setup();
    }

    this.build();
  }

  setup() {
    this.svg = this.host
                   .append('svg')
                   .attr('width', this.width + this.margin.left + this.margin.right)
                   .attr('height', this.height + this.margin.top + this.margin.bottom)
                   .call(this.responsivefy)
                   .append('g')
                   .attr('transform', 'translate('+ this.margin.left +', '+ this.margin.top +')')
  }

  build() {

    this.xScale = d3.scaleBand()
                    .padding(0.2)
                    .domain(this.data.map(d => d.stock))
                    .range([0, this.width]);

    this.xAxis = d3.axisBottom(this.xScale)
                   .ticks(2);

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.data, d => d.price)])
                    .range([this.height, 0]);

    this.yAxis = d3.axisLeft(this.yScale).ticks(10);

    this.svg.call(this.yAxis);

    this.update = this.svg.selectAll('rect')
                        .data(this.data);

    this.update
        .transition(this.t)
        .attr('y', d => this.yScale(d.price))
        .attr('height', d => this.height - this.yScale(d.price));

    this.update
        .enter()
        .append('rect')
        .attr('y', this.height)
        .attr('height', 0)
        .attr('x', d => this.xScale(d.stock))
        .attr('width', d => this.xScale.bandwidth())
        .transition(this.t)
        .delay(this.update.exit().size() ? 10: 0)
        .attr('y', d => this.yScale(d.price))
        .attr('height', d => this.height - this.yScale(d.price))
        .style('fill', '#FFCC80');


    this.update.exit()
             .transition(this.t)
             .attr('y', this.height)
             .attr('height', d => this.height - this.yScale(d.price))
             .remove();

    this.svg
        .append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .call(this.xAxis);

  } //End build()

  responsivefy(svg) {

    let margin = { top: 20, right: 20, left: 40, bottom: 40 };
    var container = d3.select(svg.node().parentNode);

    var width = parseInt(svg.style('width'));
    var height = parseInt(svg.style('height'));
    var aspect = width / height;


    svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
       .attr('preserveAspectRatio', 'xMinYMid')
       .call(resize);


    d3.select(window).on('resize.' + container.attr('id'), resize);

    function resize() {
      var targetWidth = parseInt(container.style('width'));

      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth/aspect));
    }
  }

  getNativeElement(element: ElementRef) {
    return element.nativeElement;
  }
}
