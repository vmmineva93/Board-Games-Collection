// import { Component, DestroyRef, OnInit } from '@angular/core';
// import { Game } from '../../types/games.js';
// import { User } from '../../types/user.js';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { ApiService } from '../../api.service.js';
// import { UserService } from '../../user/user.service.js';

// @Component({
//   selector: 'app-current-game',
//   standalone: true, 
//   imports: [RouterLink],
//   templateUrl: './current-game.component.html',
//   styleUrl: './current-game.component.css'
// })
// export class CurrentGameComponent implements OnInit{
//   game = {} as Game;
//   likes = 0;
//   user: User | null = null;

//   isOwner: boolean = false;
//   isGameLikedByUser: boolean = false;
//   gameId: string = '';

//   get isLogged(): boolean {
//     return this.userService.isLogged;
//   }

//   constructor(
//     private destroyRef: DestroyRef,
//     private route: ActivatedRoute,
//     private apiService: ApiService,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['gameId'];
//     this.gameId = id;

//     const user = this.userService.user$.subscribe((user) => {
//       this.user = user;
//     });

//     const likesGame = this.apiService
//       .getLikesOnGame(this.gameId)
//       .subscribe((likes) => {
//         this.isGameLikedByUser = Object.values(likes).some((like) =>
//           like._ownerId === this.userService.user?._id
//             ? (this.isGameLikedByUser = true)
//             : (this.isGameLikedByUser = false)
//         );
//       });

//     const subscription = this.apiService
//       .getSingleGame(id)
//       .subscribe((game) => {
//         this.game = game;

//         if (this.userService.isLogged) {
//           this.isOwner = this.game._ownerId === this.userService.user?._id;
//         }
//       });

//     this.apiService.getLikesOnGame(id).subscribe((likes) => {
//       this.likes = Object.keys(likes).length;
//     });
//     this.destroyRef.onDestroy(() => subscription.unsubscribe());

//   }

//   like(id: string) {
//     this.apiService.getLikesOnGame(id).subscribe((likes) => {
//       this.isGameLikedByUser = Object.values(likes).some(
//         (like) => like._ownerId === this.userService.user?._id
//       );

//       if (this.isGameLikedByUser) {
//         return;
//       } else {
//         this.apiService.likeGame(id).subscribe(() => {
//           this.apiService.getLikesOnGame(id).subscribe((likes) => {
//             this.likes = Object.keys(likes).length;
//           });
//         });
//         this.isGameLikedByUser = true;
//       }
//     });
//   }

//   delete() {
//     const id = this.route.snapshot.params['gameId'];

//     const confirmation = confirm(`Do you want to delete this game?`);
//     if (!confirmation) {
//       return;
//     }

//     this.apiService.deleteGame(id).subscribe(() => {
//       this.router.navigate(['/collection']);
//     });
//   }

// }

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

    // Абонираме се за текущия потребител
    this.userService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => this.user = user);

    // Зареждаме играта
    this.apiService.getSingleGame(this.gameId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(game => {
        this.game = game;
        this.isOwner = this.userService.isLogged && this.game._ownerId === this.userService.user?._id;
      });

    // Зареждаме лайковете
    this.loadLikes();
  }

  // Зареждане на лайкове
  loadLikes() {
    this.apiService.getLikesOnGame(this.gameId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((likes: any[] | null) => likes || []) // гарантира празен масив
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
