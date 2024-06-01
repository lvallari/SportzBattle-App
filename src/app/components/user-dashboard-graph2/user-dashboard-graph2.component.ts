import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-user-dashboard-graph2',
  standalone: true,
  imports: [CommonModule, PlotlyModule],
  templateUrl: './user-dashboard-graph2.component.html',
  styleUrl: './user-dashboard-graph2.component.scss'
})
export class UserDashboardGraph2Component implements OnChanges {

  @Input() activity!:any[];

  graph_data:any[] = [];
  ready:boolean = false;

  public graph:any = {
    /*
    data: [
        { x: [60,80,10], y: ['MLB','NFL','NBA'], type: 'bar', marker: {
          color: '33ccff' // Bar color
      }, orientation: 'h' },
    ],
    */
    layout: {
      width: document.getElementById('myrow')?.offsetWidth, 
      height: 400,
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
            text: 'Percentile',
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
            text: '',
            font: {
                color: 'white' // Y axis title color
            }
        },
        tickfont: {
            color: 'white' // Y axis tick labels color
        }
    },

    /*
    images: [
      {
        source: '../../../assets/images/nba.png',
        xref: 'x',
        yref: 'y',
        x: 1,
        y: 10,
        sizex: 0.1,
        sizey: 0.1,
        xanchor: 'center',
        yanchor: 'middle'
      },
      {
        source: '../../../assets/images/nfl.png',
        xref: 'x',
        yref: 'y',
        x: 2,
        y: 11,
        sizex: 0.1,
        sizey: 0.1,
        xanchor: 'center',
        yanchor: 'middle'
      },
      {
        source: '../../../assets/images/mlb.png',
        xref: 'x',
        yref: 'y',
        x: 2,
        y: 11,
        sizex: 0.1,
        sizey: 0.1,
        xanchor: 'center',
        yanchor: 'middle'
      },
      // Add more icons as needed
    ]
    */

  },
    config: {displayModeBar: false, responsive: true, editable:false}
};


ngOnChanges(changes: SimpleChanges): void {
  
  //sort by category
  var nba_questions = this.activity.filter((n:any) => {return n.category == 'NBA'});
  var nfl_questions = this.activity.filter((n:any) => {return n.category == 'NFL'});
  var mlb_questions = this.activity.filter((n:any) => {return n.category == 'MLB'});

  var nba_pct = 100* nba_questions.filter((x:any) => {return x.got_it_right == 1}).length / nba_questions.length;
  var nfl_pct = 100* nfl_questions.filter((x:any) => {return x.got_it_right == 1}).length / nfl_questions.length;
  var mlb_pct = 100* mlb_questions.filter((x:any) => {return x.got_it_right == 1}).length / mlb_questions.length;

  this.graph.data = [
    {
      x: [mlb_pct, nfl_pct, nba_pct], y: ['MLB', 'NFL', 'NBA'], type: 'bar', marker: {
        color: '33ccff' // Bar color
      }, orientation: 'h'
    },
  ];

  var doc = document.getElementById('myrow');
  console.log('doc', doc);
  if (doc) {
    console.log('width', doc.offsetWidth);
    var width = doc.offsetWidth;
    this.graph.layout.width = width;
  }

  //console.log('document.getElementById()?.offsetWidth', document.getElementById('myrow').offsetWidth)
  //this.graph.layout.width = this.graph.layout.width - 500;
  this.ready = true;

  console.log('this.graph', this.graph);

}

}
