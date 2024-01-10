import { Router } from 'express';
const router = Router();
import { deleteUser, login,sendData,signUp, updateData } from '../controller/userController.js';
import { addToken, authentication, checker } from '../controller/authentication.js';
// Use the upload middleware to handle file uploads

router.post('/signup', signUp);
router.post('/login', login,addToken);
router.post('/data',authentication,sendData)
router.put('/update',updateData)
router.post('/check',checker)
router.delete('/delete',deleteUser)

export default router;
