# Board-Games-Collection

Project Description:
- This is my first Angular project – a board games collection application. It provides a public area where visitors can browse the collection and view game details, as well as a private area where registered users can manage their own games.

Features:
- Home Page: Welcome message, quick navigation to the collection, and recently added games.
- Games Collection: Search by title. Displays all games with a “Details” button to view full descriptions.
- Game Details: Standalone page showing title, time since upload, description, number of players, age recommendation, playing time, category, and likes count.
- Аuthentication: User registration and login.
- Add Game (CRUD): Authenticated users can create, update, and delete their own games.
- My Meeple: User profile section with personal information.
- Likes: Authenticated users can like games (one like per user, excluding their own games).
- Error Handling: Client-side validation and API error messages.

# Run the Project

## 1. Install the Dependencies
- Open an integrated terminal in the client folder and type:

```sh
npm install

```

## 2. Run the Server
- Open an integrated terminal in the server folder and type:

```sh
node server

```

## 3. Run the Client
- Open an integrated terminal in the client folder and type:

```sh
npm ng serve

```
## The service is initialized with three users, which can be used for immediate testing:

- peter@abv.bg : 123456
- george@abv.bg : 123456
- admin@abv.bg : admin
