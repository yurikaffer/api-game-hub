import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
    public async index({ response }: HttpContextContract) {
      try {
        const users = await User.all();
        return response.status(200).json(users);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    public async store({ request, response }: HttpContextContract) {
      try {
        const createData = request.all();
        const users = await User.create(createData);
  
        return response.status(201).json(users);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    public async show({ params, response }: HttpContextContract) {
      try {
        const user = await User.findOrFail(params.id);
        return response.status(200).json(user);
      } catch (error) {
        console.error(error);
        return response.status(404).json({ error: 'user not found' });
      }
    }
  
    public async update({ params, request, response }: HttpContextContract) {
      try {
        const user = await User.findOrFail(params.id);
        const updateData = request.all();
  
        user.merge(updateData);
        await user.save();
  
        return response.status(200).json(user);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    public async destroy({ params, response }: HttpContextContract) {
      try {
        const user = await User.findOrFail(params.id);
        await user.delete();
  
        return response.status(204);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
