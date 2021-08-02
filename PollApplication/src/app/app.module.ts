import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PollService } from './poll-service/poll.service';
@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollListComponent,
    PollDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
