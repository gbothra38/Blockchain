import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output   } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../typo';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements AfterViewInit {
  @Input() voted: boolean;
  @Input() image: string;
  @Input() options: string[];
  @Input() result: number[];
  @Input()  question: string;
  @Input() id: number;

  @Output() pollVotedFromForm: EventEmitter<PollVote> = new EventEmitter();

	pollForm:FormGroup;

  constructor(private fb:FormBuilder) {
  	this.pollForm=this.fb.group({
  		option:this.fb.control('',[Validators.required]),
  	})
   }

  ngAfterViewInit(): void {
    if(this.voted){
      this.generateChart();
    }
  }

  SubmitForm(){
    const pollVoted: PollVote = {
      id: this.id,
      vote: this.pollForm.get("option").value
    }
    this.pollVotedFromForm.emit(pollVoted);
  	//console.log(this.pollForm.value)
  }

  generateChart(){
    const options:ApexCharts.ApexOptions ={
      series: [
          {
          data: this.result,
          },
        ],
         
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
            distributed: true,
          }
        },
        legend: {
          show: false,
        },
                
        xaxis: {
          categories: this.options,
        },
                
        };

        const chart = new ApexCharts(document.getElementById('poll-results'),options);
        chart.render();
    }
  }
