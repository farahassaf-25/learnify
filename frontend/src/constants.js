export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export const COURSES_URL = BASE_URL + '/learnify/courses';
export const LOGIN_URL = BASE_URL + '/learnify/login';
export const REGISTER_URL = BASE_URL + '/learnify/register';

export const USER_URL = BASE_URL + '/learnify/user';

