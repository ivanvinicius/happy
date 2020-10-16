import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Valid from 'yup';

import Orphanage from '../models/Orphanage';

import orphanageView from '../views/orphanages_view';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
    
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    })
  
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Valid.object().shape({
      name: Valid.string().required(),
      latitude: Valid.number().required(),
      longitude: Valid.number().required(),
      about: Valid.string().required().max(300),
      instructions: Valid.string().required(),
      opening_hours: Valid.string().required(),
      open_on_weekends: Valid.boolean().required(),
      images: Valid.array(Valid.object().shape({
        path: Valid.string().required(),
      })),
    })

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);
  
    return response.status(201).json(orphanage);
  }
}