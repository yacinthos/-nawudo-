import * as security from 'security';
import * as views from 'views';

const homeRoutes = [
    {
        path: '/',
        exact: true,
        name:'home',
        component: security.isAuthenticated()(views.HomePage)
    }
];
export default homeRoutes;