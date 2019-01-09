import * as views from 'views';
const _ = require('lodash');
const routes = [
  {
    path: '/',
    exact: true,
    name: 'home',
    component: views.HomePage
  }
];

export default routes;

export function generateRoute(name, param = {}) {
  const route = find(routes, 'name', name);
  if (route) {
    let path = route[0].path;
    _.forEach(param, (value, paramName) => {
      path = path.replace(':' + paramName, value);
    });
    return path;
  }
  return null;
}

function find(obj, key, val) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(find(obj[i], key, val));
    } else if ((i === key && obj[i] === val) || (i === key && val === '')) {
      //
      objects.push(obj);
    } else if (obj[i] === val && key === '') {
      if (objects.lastIndexOf(obj) === -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}
