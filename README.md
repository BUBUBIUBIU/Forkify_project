# Forkify
This web app offers all kinds of recipes for different delicious food. User can search for food and select a recipe. Then, he or she can adjust the amount of each ingredient according to servings. Moreover, recipe can be added to favorite list locally. In this project:
*	MVC pattern is applied. For example, search functionality. Developer does ajax call in search model (src/js/models/Search.js) to get recipes for certain search query from API. On the other hand, in the view part (src/js/views/searchView.js) is where developer gets the search query string from the user interface, and also where developer prints the results of the search. And the controller (src/js/index.js) brings these two together.
*	Axios module is applied to do some asynchronous operations like send request.
*	Webpack (including loaders and plugins) is configured and applied to build production version.
*	The items in like list are stored in local storage.
*	Developer deployed this app on firebase. URL is https://forkify-fc1da.web.app/.