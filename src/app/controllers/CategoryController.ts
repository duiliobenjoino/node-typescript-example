import { Request, Response, Router } from 'express';
import {body, validationResult} from 'express-validator';
import {CategoryRepositoryTO} from '../../infra/typeorm/repositories/CategoryRepositoryTO';
import CategoryService from '../services/CategoryService';

const categoryRouter = Router({mergeParams: true});
const service: CategoryService = new CategoryService(new CategoryRepositoryTO());


categoryRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    const { user_id } = req.params;
    const name  = req.query.name as string;

    const result = await service.find(user_id, name);
    return res.status(200).json(result);
});

categoryRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { user_id, id} = req.params;
    const category = await service.findBy(user_id, id)
    return res.status(200).json(category);
});

categoryRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { user_id, id} = req.params;
    await service.delete(user_id, id);
    return res.status(200).send();
});

categoryRouter.post('/',
    validator(),
    async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors)
        }

        const { user_id } = req.params;
        const result = await service.save(req.body, user_id)
        result.userId = undefined;
        
        return res.status(result.id ? 200 : 201).json(result);
    }
);

function validator() {
    return [
        body('name', 'Name is required').notEmpty()
    ]
}

export default categoryRouter