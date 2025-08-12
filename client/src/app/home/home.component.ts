import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service.js';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAll().subscribe((p) => {
      console.log(p);
      
    })
  }

}
