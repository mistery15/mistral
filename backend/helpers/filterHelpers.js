const moment = require('moment');

exports.createSearchQuery = (search) => {
    let finalQuery = {};
    if(search && search.length){
      const query = search.split(' ');
      if(!isNaN(query[0]) && query[1] && query.length === 2){
        finalQuery = {
          ...finalQuery,
          [query[1]]: parseFloat(query[0])
        };
      }
      else if (query.length === 2 && (query[0] === 'after' || query[0] === 'before') && !isNaN(query[1])){
        let finalDate = moment(`${query[1]}-01-01`).startOf('year');
        finalQuery = {
          ...finalQuery,
          release_date: { [query[0] === 'before' ? `$lte` : `$gte`]: finalDate.toString() }
        };
      }
      else if(query.length === 4 && (query[0] === 'older' || query[0] === 'younger') && query[1] === 'than') {
        if(!query[3] === 'years' || !query[3] === 'months') return;
        let finalDate = moment();
        finalDate.startOf('day').subtract(parseInt(query[2]), query[3]);
        
        finalQuery = {
          ...finalQuery,
          release_date: { [query[0] === 'older' ? `$lte` : `$gte`]: finalDate.toString() }
        };
      }
      else if(query.length === 4 && query[0] === 'at' && (query[1] === 'least' || query[1] === 'most')) {
        if(!isNaN(query[2])){
          finalQuery = {
            ...finalQuery,
            [query[3]]: { [query[1] === 'most' ? `$lte` : `$gte`]: parseFloat(query[2]) }
          };
        }
      }
      else {
        finalQuery = {
          ...finalQuery,
          $text: { $search: search }
        }
      }
    }

    return finalQuery;
}