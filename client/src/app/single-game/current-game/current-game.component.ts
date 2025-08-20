import { Component, DestroyRef, OnInit } from '@angular/core';
import { Game } from '../../types/games.js';
import { User } from '../../types/user.js';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service.js';
import { UserService } from '../../user/user.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-game',
  standalone: true, 
  imports: [RouterLink, ElapsedTimePipe, CommonModule],
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
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
    this.gameId = this.route.snapshot.params['gameId'];

   
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => this.user = user);


    this.apiService.getSingleGame(this.gameId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(game => {
        this.game = game;
        this.isOwner = this.userService.isLogged && this.game._ownerId === this.userService.user?._id;
      });

   
    this.loadLikes();
  }

 
  loadLikes() {
    this.apiService.getLikesOnGame(this.gameId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((likes: any[] | null) => likes || []) 
      )
      .subscribe((likes: any[]) => {
        this.likes = likes.length;
        this.isGameLikedByUser = likes.some(like => like._ownerId === this.userService.user?._id);
      });
  }

  like() {
    if (this.isGameLikedByUser) return;

    this.apiService.likeGame(this.gameId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.likes++;
        this.isGameLikedByUser = true;
      });
  }

  delete() {
    const confirmation = confirm(`Do you want to delete this game?`);
    if (!confirmation) return;

    this.apiService.deleteGame(this.gameId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/collection']));
  }
}
