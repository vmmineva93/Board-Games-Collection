import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorMsgService } from './error-msg.service.js';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css'
})
export class ErrorMsgComponent implements OnInit {
  errorMsg: string | null | undefined = '';
  errorSubscription: Subscription | null = null;
  
  constructor(private errorMessagesService: ErrorMsgService) {}

  ngOnInit(): void {
    
    this.errorSubscription = this.errorMessagesService.apiError$.subscribe((error: any) => {
      
      this.errorMsg = error
    })
  }
  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
