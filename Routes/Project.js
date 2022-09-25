import express from 'express';
import { createProject, deleteProject, updateProject ,getProjects,reorderProjects, getSingleProject} from '../Controllers/Project.js';
var router = express.Router();

router.route('/project').get(getProjects).post(createProject).delete(deleteProject).put(updateProject)
router.route('/reorderProjects').put(reorderProjects)
router.route('/getSingleProject').put(getSingleProject)
export default router