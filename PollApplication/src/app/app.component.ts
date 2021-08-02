import { Component } from '@angular/core';
import { Poll, PollForm, PollVote } from './typo';
import { PollService } from './poll-service/poll.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PollApplication';
  flag= false;
  activePoll:Poll= null;
  polls=this.pollService.getPoll();

  
  constructor(private pollService: PollService){

  }

  ngOnInit(){
    this.pollService.onEvent("PollCreated").subscribe(() => {
    this.polls = this.pollService.getPoll();
    });

    
  }

  handlePollCreated(pollForm: PollForm) {
    this.pollService.createPoll(pollForm);
  }

  handlePollVoted(pollVoted: PollVote) {
    this.pollService.vote(pollVoted.id, pollVoted.vote);
  }

  setActivePoll(poll){
    this.activePoll=null;

    setTimeout(()=>{
      this.activePoll=poll;
    },100);
    
  }
}
