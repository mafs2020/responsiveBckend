import { Router } from 'express';
import * as User from '../controllers/userController';
import verificarLogin from '../middlware/verificarLogin';
const router = Router();

// router.get('/', verificarLogin, User.todosUsuarios);
router.get('/', User.todosUsuarios);
router.get('/:id', User.obtener);
router.post('/', User.crear);
router.put('/:id', User.update);
router.delete('/:id', User.deleteUser);
router.post('/login', User.login);

export default router;