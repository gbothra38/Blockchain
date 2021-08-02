import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Observable } from 'rxjs';

const contractABI = require('./contractABI_Tmp.json');
declare var window: any;
@Injectable({
  providedIn: 'root'
})

export class Web3Service {
	private web3: Web3;
	private contract: Contract;
	private contractAddress = "0x7DfCEAce4Dc01EeE6B88A999CB402bcc03Bb9068";
	

  constructor(private zone: NgZone) { 
  	if(window.web3){
			this.web3 = new Web3(window.ethereum);
			this.contract = new this.web3.eth.Contract(contractABI, this.contractAddress);
			window.ethereum.enable().catch((err) => { console.log(err);
			});
  	}
  	else{
			console.warn("Metamask not found");
  	}
  }

  getAccount(): Promise<string>{
	  return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '');
  }

  async executeTransaction(functionName:string, ...args:any[]): Promise<void>{
	  const acc = await this.getAccount();
	  this.contract.methods[functionName](...args).send({ from: acc });
  }

  async call(functionName: string, ...args:any[]){
	  const acc = await this.getAccount();
	  return this.contract.methods[functionName](...args).call({ from: acc });
  }

  onEvents(event:string){
  	return new Observable((observer)=>{
			this.contract.events[event]().on('data', (data) => {
				this.zone.run(() => {
					observer.next({
						event: data.event,
						payload: data.returnValues
					});
				});
				
			});
  	});

  }

}