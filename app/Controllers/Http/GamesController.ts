import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from "App/Models/Game";
import { cuid } from '@ioc:Adonis/Core/Helpers';

export default class GamesController {
    public async index({ response }: HttpContextContract) {
      try {
        const games = await Game.all();
        return response.status(200).json(games);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    public async store({ request, response }: HttpContextContract) {
      try {
        const { name, description, price, link } = request.all();
        const file = request.file('file');
  
        if (!file) {
          return response.status(400).json({ error: 'No file provided' });
        }
  
        const fileName = `${cuid()}.${file.extname}`;
        await file.move('./public', { name: fileName });
  
        const game = await Game.create({
          name,
          description,
          price,
          link,
          image: 'http://localhost:3333/' + fileName, // Salve o nome do arquivo no banco de dados
        });
  
        return response.status(201).json(game);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }

    public async update({ params, request, response }: HttpContextContract) {
      try {
        const game = await Game.findOrFail(params.id);
        const updateData = request.all();
        const file = request.file('file')

        if (file) {
          const fileName = `${cuid()}.${file.extname}`;
          await file.move('./public', { name: fileName });
          game.image = 'http://localhost:3333/' + fileName;
        }
        
        game.merge(updateData);
        await game.save();
  
        return response.status(200).json(game);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    public async show({ params, response }: HttpContextContract) {
      try {
        const game = await Game.findOrFail(params.id);
        return response.status(200).json(game);
      } catch (error) {
        console.error(error);
        return response.status(404).json({ error: 'game not found' });
      }
    }
  
    public async destroy({ params, response }: HttpContextContract) {
      try {
        const game = await Game.findOrFail(params.id);
        await game.delete();
  
        return response.status(204);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
