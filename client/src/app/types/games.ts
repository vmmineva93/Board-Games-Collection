export interface Game {
    _ownerId: string;
    title: string,
    players: string,
    playingTime: string,
    age: string,
    categories: string,
    description: string,
    imageUrl: string,
    _createdOn: string,
    likes: string[];
    _id: string;
}

export interface GamePayload {
    title: string;
    players: string;
    playingTime: string;
    age: string;
    categories: string;
    imageUrl: string;
    description: string;
  }

  export interface Like {
    _id: string;
    gameId: string;
    _ownerId: string;
  }