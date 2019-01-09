import _filter from 'lodash/filter';
export const travel = [
  {
    start_date: '2019-01-11',
    end_date: '2019-01-11',
    start_station: 'Tokpa',
    end_station: 'Seme-poji',
    price: 1200
  },
  {
    start_date: '2019-01-12',
    end_date: '2019-02-12',
    start_station: 'Tokpa',
    end_station: 'Calavi',
    price: 200
  },
  {
    start_date: '2019-09-11',
    end_date: '2019-01-13',
    start_station: 'Tokpa',
    end_station: 'Calavi',
    price: 200
  }
];
export function Api(values) {
  return new Promise(function(resolve) {
    setTimeout(resolve(_filter(travel, values)), 1000);
  });
}
