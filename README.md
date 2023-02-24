<div align="left">
  <a href="https://www.soyhenry.com/">
    <img src="https://user-images.githubusercontent.com/108427945/220423842-b40a485f-734b-418e-81f7-6ddfa23acd99.png" width="200" >
  </a>
</div>

# **HenryGames** #
### Final project developed in Henry, Web development bootcamp. ###
<div align="center">
  <a href="https://client-ochre-five.vercel.app/">
    <img src="https://user-images.githubusercontent.com/108427945/220424776-f2c06892-dc47-4073-a475-5eb41ff8927c.png" width="500" >
  </a>
</div>

### Important ⚠️ ###
For deployment purposes, two repos were used:
- API: https://github.com/zodieth/CLIENT
- Client: https://github.com/juanleiton/PI-Videogames_client

### Goal 🏁 ###
Develop a **full stack Web app** that takes data from an external videogame API. 🎮

### Features ✔️ ###
- 🚪 Main view, in which all videogames are visualized, whether they were added by the user or not.
- 🔍 Searchbar on every view, by which videogames whose title contains the entered text are returned. Results include videogames from the API, as well as those added by the user.
- 📑 Detail view, in which further information for a particular videocame can be visualized.
- 🗐 Dynamic paging, regardless of the number of results or the selected filters and ordering.
- 🎚️ Combined filters and ordering in the main view, as well as in the search view. The user can choose between visualizing all videogames, only those created by the him/her, or only those returned by the external API. It is also possible to filter by one or more genres, and sort either by title or rating, in both ascending and descending order; ascending sorting by title is selected by default.
- ➕ CRUD. In addition to viewing and adding videogames, it is also possible to create or delete an already existing one, this can be done through a couple of buttons in the detail view, which are disabled if the videogame in question was not added by the user.
- ⛔ Real-time data validation when adding or updating videogames. The Submit button is disabled/enabled depending on whether the entered data meet certain criteria or not, which is detailed under each field; for example, when the number of characters in the title exceeds the maximum allowed.

### Tools & technologies 🖥️ ###
 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
  <img src="https://user-images.githubusercontent.com/108427945/220447577-2d40e53b-d911-4919-9df8-1a832e7264e1.png" width="50" >
 </a>
 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
  <img src="https://user-images.githubusercontent.com/108427945/220448197-9361ad94-2867-4aca-8bcd-3a4ddb2b499c.png" width="50" >
 </a>
 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
  <img src="https://user-images.githubusercontent.com/108427945/220448406-7bcd41a4-e0c3-4d97-8901-6ec45c3effa5.png" width="50" >
 </a>
 <a href="https://www.postgresql.org/">
  <img src="https://user-images.githubusercontent.com/108427945/220448808-2ccebd50-595e-4b02-8b59-ac7b4f5e52d4.png" width="50" >
 </a>
 <a href="https://sequelize.org/">
  <img src="https://user-images.githubusercontent.com/108427945/220449748-8b0cce45-1156-49a7-a6da-83a8d921c83b.png" width="50" >
 </a>
 <a href="https://nodejs.org/en/">
  <img src="https://user-images.githubusercontent.com/108427945/220450396-5786cd98-e2ce-47e8-b15f-056a251bd01b.png" width="50" >
 </a>
 <a href="https://expressjs.com/">
  <img src="https://user-images.githubusercontent.com/108427945/220450657-a17aca01-f90d-4843-9137-20bca9668a22.png" width="50" >
 </a>
 <a href="https://reactjs.org/">
  <img src="https://user-images.githubusercontent.com/108427945/220451016-cfb63adb-0aa4-493a-bef0-e090e301b3b1.png" width="50" >
 </a>
 <a href="https://redux.js.org/">
  <img src="https://user-images.githubusercontent.com/108427945/220451188-0dd37557-2067-4058-b6bc-eb14377f334c.png" width="50" >
 </a>

### How to run this project locally ⚙️ ###
1. Install PostgreSQL.
2. Create a database with the name "videogames".
3. Inside "PI-Videogames_api", create a .env file, then copy and paste the following:
```
DB_USER={user}
DB_PASSWORD={password}
DB_HOST=localhost
API_KEY=7a8e8bb3505d4946bdffee2a3ef9eb56

# Replace {user} and {password} with your own Postgres credentials.
```
4. Using the NPM package manager, inside "PI-Videogames_api" and "PI-Videogames_client" run the following command:
```
npm install
```
5. Once all dependencies have been correctly installed, run the following command, first in "PI-Videogames_api" and then in "PI-Videogames_client":
```
npm start
```
### How to reach me 📫 ###
If any trouble arises while running this project 🚩, or to address any related concerns ❓, email me 📧 at jgleitonl@gmail.com.
