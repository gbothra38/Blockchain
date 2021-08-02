export interface Poll extends PollForm {
	id: number;
	result: number[];
	voted: boolean
}
export interface PollForm {
	question: string;
	image: string;
	options: string[];
}

export interface PollVote {
	id: number;
	vote: number;
}

export interface Voter {
	id: string;
	voted: number[];
}