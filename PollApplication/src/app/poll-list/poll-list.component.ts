import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {
	@Input() question: string;
	@Input() image: string;
	@Input() result: number[];
	@Input() voted: boolean;
	@Input() options: string[];
	total_votes:number;
  constructor() { }

  ngOnInit(): void {
  	if(this.result.length){
  		this.total_votes=this.result.reduce((acc,curr)=>{
  			return (acc+=curr);
  		});
  	}
  }

}
