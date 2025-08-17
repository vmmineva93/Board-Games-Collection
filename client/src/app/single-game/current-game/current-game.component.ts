import { Component, DestroyRef, OnInit } from '@angular/core';
import { Game } from '../../types/games.js';
import { User } from '../../types/user.js';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service.js';
import { UserService } from '../../user/user.service.js';
import { LoaderComponent } from '../../shared/loader/loader.component.js';

@Component({
  selector: 'app-current-game',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './current-game.component.html',
  styleUrl: './current-game.component.css'
})
export class CurrentGameComponent implements OnInit{
  game = {} as Game;
  likes = 0;
  user: User | null = null;

  isOwner: boolean = false;
  isGameLikedByUser: boolean = false;
  gameId: string = '';

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['gameId'];
    this.gameId = id;

    const user = this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    const likesGame = this.apiService
      .getLikesOnGame(this.gameId)
      .subscribe((likes) => {
        this.isGameLikedByUser = Object.values(likes).some((like) =>
          like._ownerId === this.userService.user?._id
            ? (this.isGameLikedByUser = true)
            : (this.isGameLikedByUser = false)
        );
      });

    const subscription = this.apiService
      .getSingleGame(id)
      .subscribe((game) => {
        this.game = game;

        if (this.userService.isLogged) {
          this.isOwner = this.game._ownerId === this.userService.user?._id;
        }
      });

    this.apiService.getLikesOnGame(id).subscribe((likes) => {
      this.likes = Object.keys(likes).length;
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

  }

  like(id: string) {
    this.apiService.getLikesOnGame(id).subscribe((likes) => {
      this.isGameLikedByUser = Object.values(likes).some(
        (like) => like._ownerId === this.userService.user?._id
      );

      if (this.isGameLikedByUser) {
        return;
      } else {
        this.apiService.likeGame(id).subscribe(() => {
          this.apiService.getLikesOnGame(id).subscribe((likes) => {
            this.likes = Object.keys(likes).length;
          });
        });
        this.isGameLikedByUser = true;
      }
    });
  }

  delete() {
    const id = this.route.snapshot.params['gameId'];

    const confirmation = confirm(`Do you want to delete this game?`);
    if (!confirmation) {
      return;
    }

    this.apiService.deleteGame(id).subscribe(() => {
      this.router.navigate(['/collection']);
    });
  }

}
