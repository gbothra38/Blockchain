import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll, PollForm } from '../typo'
import { Web3Service } from '../blockchain/web3.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3: Web3Service) { }
  async getPoll():Promise<Poll[]>{
    const polls: Poll[] = [];
    const totalPolls = await this.web3.call('getTotalPoll');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);
    
    for (let i = 0; i < totalPolls; i++){
      const pollRaw = await this.web3.call('getPoll', i);
    const pollNormalized = this.normalizePoll(pollRaw,voterNormalized);
    polls.push(pollNormalized);
    }
    return polls;
  	
  }

   

  vote(pollId:number, voteNumber:number){
    this.web3.executeTransaction('vote', pollId, voteNumber);

  }

  createPoll(pollForm: PollForm) {
    this.web3.executeTransaction('createPoll', pollForm.question, pollForm.image || '', pollForm.options);
  }

  private normalizeVoter(voter){
    return {
      id: voter[0],
      voterIds: voter[1].map(vote => parseInt(vote)),
    };
  }

  private normalizePoll(pollRaw, voterNormalized):Poll{
    return {
      id:parseInt(pollRaw[0]),
      question:pollRaw[1],
      image:pollRaw[2],
      result: pollRaw[3].map(vote => parseInt(vote)),
      options:pollRaw[4],
      voted: voterNormalized.voterIds.length && voterNormalized.voterIds.find((voterId) => voterId=== parseInt(pollRaw[0]))!=undefined,
    };
  }

  onEvent(name:string){
    return this.web3.onEvents(name);
  }

}
