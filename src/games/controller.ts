import { JsonController, Post, Param, HttpCode, NotFoundError, Get, BodyParam } from 'routing-controllers'
import { Game } from './entity'
import { makeUserMove, makeComputerMove, checkFinished, getShipsGrid } from './game'

@JsonController()
export default class GameController {

  @Post('/games')
  @HttpCode(201)
  async createGame() {  
    let game = await Game.create()
    game.shipsGridUser = getShipsGrid()
    game.shipsGridComputer = getShipsGrid()
    return game.save()  
  }

  @Get('/games/:id([0-9]+)')
  async getGame(
    @Param('id') id: number
  ) {
    const game = await Game.findOneById(id)
    if (!game) throw new NotFoundError(`Game does not exist`)

    return game
  }

  @Post('/games/:id([0-9]+)')
  async updateGame(
    @Param('id') id: number,
    @BodyParam('coordinate') coordinate: any
  ) {

    let game:any = await Game.findOneById(id)
    if (!game) throw new NotFoundError(`Game does not exist`)

    game = makeUserMove(game,coordinate)
    game = makeComputerMove(game)
    game = checkFinished(game)
  
    return game.save()
  }
}

