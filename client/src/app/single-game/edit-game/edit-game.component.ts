import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Game } from '../../types/games.js';
import { ApiService } from '../../api.service.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.css'
})
export class EditGameComponent implements OnInit {
  game = {} as Game;

  @ViewChild('editForm') editForm: NgForm | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['gameId'];

    this.apiService.getSingleGame(gameId).subscribe((game) => {
      this.game = game;

      this.editForm?.form.controls['title'].setValue(this.game.title);
      this.editForm?.form.controls['players'].setValue(this.game.players);
      this.editForm?.form.controls['playingTime'].setValue(this.game.playingTime);
      this.editForm?.form.controls['age'].setValue(this.game.age);
      this.editForm?.form.controls['categories'].setValue(this.game.categories);
      this.editForm?.form.controls['imageUrl'].setValue(this.game.imageUrl);
      this.editForm?.form.controls['description'].setValue(this.game.description);
    });
  }

  edit() {
    const { title, players, playingTime, age, categories, imageUrl, description } = this.editForm?.value;

    const gameId = this.game._id;

    this.apiService
      .updateGame(gameId, title, players, playingTime, age, categories, imageUrl, description )
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/collection']);
      });
  }

  onCancel(event: Event) {
    event.preventDefault();
    history.back();
  }
}
