import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PollForm } from '../typo';
@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})

export class PollCreateComponent implements OnInit{
	pollForm: FormGroup;
	@Output() pollCreatedFromForm: EventEmitter<PollForm> = new EventEmitter();

	constructor(private fb: FormBuilder){
		this.pollForm=this.fb.group({
			question: this.fb.control('', [Validators.required]),
			image: this.fb.control(''),
			option1: this.fb.control(''),
			option2: this.fb.control(''),
			option3: this.fb.control(''),
			option4:this.fb.control(''),
		});
	}
	ngOnInit(): void {
  	}
  	submitForm(){
			const tmp: PollForm = {
				question: this.pollForm.get("question").value,
				image: this.pollForm.get("image").value,
				options: [
					this.pollForm.get("option1").value,
					this.pollForm.get("option2").value,
					this.pollForm.get("option3").value,
					this.pollForm.get("option4").value
				]
			};
			this.pollCreatedFromForm.emit(tmp);
  	}
}
