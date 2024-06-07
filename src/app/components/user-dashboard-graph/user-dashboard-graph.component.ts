import { Component, Input, OnChanges } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
    selector: 'app-user-dashboard-graph',
    standalone: true,
    imports: [CommonModule, PlotlyModule],
    templateUrl: './user-dashboard-graph.component.html',
    styleUrl: './user-dashboard-graph.component.scss'
})
export class UserDashboardGraphComponent implements OnChanges {

    @Input() games!: any[];

    graph_data: any[] = [];
    ready: boolean = false;

    public graph: any = {
        /*
        data: [
            {
                x: ['21 May', '22 May', '23 May', '24 May', '25 May', '26 May'], y: [180, 0, 190, 120, 220, 160], type: 'bar', marker: {
                    color: '33ccff' // Bar color
                }
            },
        ],
        */
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
                    text: 'High Score',
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
        /*
        this.games.forEach((x: any) => {
            var record = this.graph_data.find((n: any) => { return n.date == x.date });
            if (record) {
                if (x.score > record.score) record.score = x.score;
            }
            else {
                var game_object = {
                    date: x.date,
                    score: x.score ? x.score : 0
                }

                this.graph_data.push(game_object);
            }
        });
        */

        this.graph.data = [
            /*
            {
                x: this.graph_data.map((x: any) => { return x.date }), y: this.graph_data.map((x: any) => { return x.score }), type: 'bar', marker: {
                    color: '33ccff' // Bar color
                }
            },
            */
            {
                x: this.games.map((x: any) => { return x.date }), y: this.games.map((x: any) => { return x.score }), type: 'bar', marker: {
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
        //console.log('this.graph', this.graph);
    }
}
