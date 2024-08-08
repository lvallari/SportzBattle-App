import { Component, Input, OnChanges } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;
@Component({
  selector: 'app-business-dashboard-graph',
  templateUrl: './business-dashboard-graph.component.html',
  styleUrl: './business-dashboard-graph.component.scss'
})
export class BusinessDashboardGraphComponent implements OnChanges {

  @Input() games!: any[];

  graph_data: any[] = [];
  ready: boolean = false;

  public graph: any = {
      layout: {
          width: document.getElementById('myrow')?.offsetWidth,
          height: 300,
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',

          title: {
              text: '',
              font: {
                  color: 'white' // Title color
              }
          },
          xaxis: {
              title: {
                  //text: 'X Axis Title',
                  font: {
                      color: 'white' // X axis title color
                  }
              },
              tickfont: {
                  color: 'white' // X axis tick labels color
              }
          },
          yaxis: {
              title: {
                  text: 'Games',
                  font: {
                      color: 'white' // Y axis title color
                  }
              },
              tickfont: {
                  color: 'white' // Y axis tick labels color
              }
          },

      },
      config: { displayModeBar: false, responsive: true, editable: false }
  };

  ngOnChanges(): void {

      //organize graph data
      this.graph_data = [];
      
      //create array of dates
      var dates:any = [];
      this.games.forEach((x:any) => {
        if (dates.indexOf(x.date) == -1) dates.push(x.date);
      });

      var number_of_games:any = [];
      dates.forEach((x:any) => {
        number_of_games.push(this.games.filter((n:any) => {return n.date == x}).length);
      });
      this.graph.data = [
          /*
          {
              x: this.graph_data.map((x: any) => { return x.date }), y: this.graph_data.map((x: any) => { return x.score }), type: 'bar', marker: {
                  color: '33ccff' // Bar color
              }
          },
          */
          {
              x: dates, y: number_of_games, type: 'bar', marker: {
                  color: '33ccff' // Bar color
              }
          },
      ];

      var doc = document.getElementById('myrow');
      if (doc) {
          var width = doc.offsetWidth;
          this.graph.layout.width = width;
      }

      this.ready = true;
      console.log('this.graph', this.graph);
  }

}
