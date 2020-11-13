import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import SubmissionsPage from '../pages/submissions';
import RegisterPage from '../pages/register';
import FinalScoresPage from '../pages/final-scores';

export const routes = [
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
    {
        path: '/submissions',
        component: SubmissionsPage,
        auth: true,
    },
    {
        path: '/final-scores',
        component: FinalScoresPage,
        auth: true,
    },
    {
        path: '/',
        component: HomePage,
    },
];
