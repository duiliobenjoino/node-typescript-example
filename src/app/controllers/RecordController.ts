import { body, validationResult } from 'express-validator';
import { RecordFilter } from './../dtos/filters/RecordFilter';
import { Request, Response, Router } from 'express';
import RecordRequestDTO from '../dtos/RecordRequestDTO';
import RecordService from '../services/RecordService';
import RecordRepositoryTO from '../../infra/typeorm/repositories/RecordRepositoryTO';

const recordRouter = Router({mergeParams: true});
const service = new RecordService(new RecordRepositoryTO()); 

recordRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    const { user_id } = req.params;
    const filter: RecordFilter = new RecordFilter(user_id, req.query);
    const response = await service.find(filter);
    return res.status(200).json(response);
});

recordRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { user_id, id } = req.params;
    const response = await service.findBy(user_id, id);
    return res.status(200).json(response);
});

recordRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { user_id, id } = req.params;
    await service.deleteBy(user_id, id);
    return res.status(200).send();
});

recordRouter.post('/', validator(), async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    const { user_id } = req.params;
    const response  = await service.save(user_id, new RecordRequestDTO(req.body));
    return res.status(req.body.id ? 200 : 201).json(response);
});

function validator() {
    return [
        body('description', 'description is required and must be 1 to 100 characters long').notEmpty().isLength({max: 100}),
        body('amount', 'amout is required and must be a number').isNumeric(),
        body('categoryId', 'categoryId is required and must be a number').isInt(),
        body('dueDate', 'dueDate is required and must have the format YYYY-MM-DD').isISO8601(),
        body('paid', 'paid is required and must be a boolean').isBoolean()
    ]
}


export default recordRouter;