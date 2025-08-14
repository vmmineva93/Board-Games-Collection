import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from './core/footer/footer.component.js';
import { AuthenticateComponent } from './authenticate/authenticate.component.js';
import { ErrorMsgComponent } from "./error-msg/error-msg.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AuthenticateComponent, ErrorMsgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
