import Route from '@ioc:Adonis/Core/Route'

Route.resource('games', 'GamesController').apiOnly()
Route.resource('users', 'UsersController').apiOnly()
