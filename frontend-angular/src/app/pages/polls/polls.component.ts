import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {}

  polls: any[];
  loadingPolls = false;

  pollDialog = false;
  questions: any[];

  nameForm: FormGroup;
  pollForm: FormGroup;
  sendForm: FormGroup;

  creatingPoll = false;
  sendPollDialog = false;
  curSendPollId = null;

  ngOnInit() {
    this.nameForm = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.pollForm = this.fb.group({
      poll: [null, [Validators.required]]
    });
    this.sendForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    })

    this.refreshPollsTable();
  }

  initPollDialog = () => {
    this.pollDialog = true
    this.questions = []
    this.nameForm.reset();
    this.pollForm.reset();
  }

  refreshPollsTable = () => {
    this.loadingPolls = true;
    this.http.get('/poll').pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => this.loadingPolls = false)
    ).subscribe(
      (payload: any[]) => {
        this.polls = payload.map(poll => ({
          ...poll,
          userCount: poll.users ? poll.users.length : 0,
          answerCount: poll.papers ? poll.papers.length : 0,
          questions: poll.questions.map((quest: string, qId: number) => {
            let posCnt = 0
            let negCnt = 0
            poll.papers.forEach((q: any) => q.answers[qId] ? ++posCnt : ++negCnt)
  
            return [quest, posCnt, negCnt]
          })
        }));
      }
    );
  }

  createPoll = () => {
    const { name } = this.nameForm.value;
    const { questions } = this;
    this.creatingPoll = false;
    this.http.post('/poll', { name, questions }).pipe(
      catchError(err => { throw err; })
    ).pipe(
      finalize(() => { this.creatingPoll = true; })
    ).subscribe(
      () => {
        this.nameForm.reset();
        this.pollForm.reset();
        this.pollDialog = false;
        this.refreshPollsTable();
      }
    )
  }

  addQuestion = () => {
    const { poll } = this.pollForm.value;
    this.questions.push(poll);
    this.pollForm.reset();

    console.log(this.questions)
  }

  showStatus = (pollId) => {
    const currentStatus = this.polls.filter(poll => poll.pollId === pollId)[0];
    this.modal.success({
      nzTitle: currentStatus.name,
      nzContent: currentStatus.questions.map(question => `
        <h3>${question[0]} <span nz-typography nzType="success">${question[1]}</span> / <span nz-typography nzType="danger">${question[2]}</span></h3>
      `).join('')
    })
  }

  openSendPoll = (pollId) => {
    this.curSendPollId = pollId
    this.sendPollDialog = true
  }

  sendPoll = () => {
    const { email } = this.sendForm.value;
    const { curSendPollId: pollId } = this
    console.log(pollId, email)
    this.http.post(`/poll/${pollId}/invite`, { email }).pipe(
      catchError(err => { throw err; })
    ).subscribe(
      () => {
        this.sendForm.reset();
        this.sendPollDialog = false;
      }
    )
  }
}
