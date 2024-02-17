import { Request, Response, Router } from 'express';
import UserFilter from '../dtos/filters/UserFilter'
import UserDTO from '../dtos/UserDTO';
import UserService from '../services/UserService';
import { body, validationResult } from 'express-validator';
import UserRepositoryTO from '../../infra/typeorm/repositories/UserRepositoryTO';

const userRouter = Router();
const service: UserService = new UserService(new UserRepositoryTO())

userRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
    const filter = new UserFilter(req.query);
    const result = await service.find(filter);
    const dto = result.map(entity => UserDTO.fromEntity(entity))
    return res.status(200).json(dto);
});

userRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const user = await service.findById(id);
    return res.status(200).json(UserDTO.fromEntity(user))
});

userRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await service.deleteById(id);
    return res.status(200).send();
});

userRouter.post('/', validator(), async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    const dto: UserDTO = UserDTO.create(req.body);
    const result = await service.save(dto);
    return res
            .status(dto.id ? 200 : 201)
            .json(UserDTO.fromEntity(result));
});

function validator() {
    const types = ['ADMIN','USER'];
    const status = ['ACTIVE', 'INACTIVE', 'PENDING'];
    return [
        body('name', 'Name is required').notEmpty(),
        body('name', 'Name must be 1 to 100 characters long').notEmpty().isLength({max: 100}),
        body('login', 'Login is required').notEmpty(),
        body('login', 'Login must be 6 to 20 characters long').isLength({min: 6, max: 20}),
        body('type', `Allowed types: [${types}]`).isIn(types),
        body('status', `Allowed status: [${status}]`).isIn(status)
    ]
}

export default userRouter;