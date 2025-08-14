import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { ErrorMsgService } from './error-msg.service.js';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit, OnDestroy {
  errorMsg: string | null | undefined = '';
  errorSubscription: Subscription | null = null;
  
  constructor(private errorMessagesService: ErrorMsgService) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorMessagesService.apiError$.subscribe((error: any) => {
      if (error) {
        this.errorMsg = error;
        this.automaticallyClose();
      }
     
    })
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }

  private automaticallyClose(): void {
    interval(1000).pipe(
      take(3),
      finalize(() => {
        this.errorMsg = ''
      })
    ).subscribe();
  }
}
