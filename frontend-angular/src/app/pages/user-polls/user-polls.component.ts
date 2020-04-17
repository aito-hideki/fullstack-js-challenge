import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.scss']
})
export class UserPollsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  polls: any[];
  loadingPolls = false;

  pollName: '';
  pollId: null;
  questions: any[];

  answerDialog = false;

  ngOnInit(): void {
    this.refreshPollsTable();
  }

  refreshPollsTable = () => {
    this.loadingPolls = true;
    this.http.get('/poll').pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => this.loadingPolls = false)
    ).subscribe(
      (payload: any[]) => { this.polls = payload; }
    );
  }

  answer = (pollId) => {
    const currentPoll = this.polls.filter(poll => poll.pollId === pollId)[0];
    this.pollId = pollId;
    this.pollName = currentPoll.name;
    this.questions = currentPoll.questions.map(q => [q, false]);
    this.answerDialog = true;
  }

  submit = () => {
    const { pollId, questions } = this;
    this.http.post(`/poll/${pollId}`, {
      answers: questions.map(q => q[1])
    }).pipe(
      catchError(err => { throw err; })
    ).subscribe(
      () => {
        this.refreshPollsTable();
        this.answerDialog = false;
        this.modal.success({
          nzTitle: 'Thank you',
          nzContent: 'Thank you for submitting answers, Cocky!'
        })
      }
    )
  }
}
