'use strict';
const angular = require('angular');
import moment from 'moment';
/*@ngInject*/
export function stockService($http) {
	// AngularJS will instantiate a singleton by calling "new" on this function

  var callback = function(){
    var serie = data.data.datatable.data;
        console.log(d);
        for(var i = 0; i < serie.length; i++){
            
            for(var x = 0; x < serie[i].length; x++){
              serie[i][0] = moment(serie[i][0]).valueOf();
            }
        
        }
    }
  
  this.getStock = function(name){
    var start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
    console.log(start_date);
    //return $http.get('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte='+ start_date + '&ticker='+ name + '&qopts.columns=date,open&api_key=EnKako51LDRb9jg9JwJH');
    return $http.get('/api/things/' + name);
  }

  this.selectStock = function(name){
    var start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
    console.log(start_date);
    
    return new Promise ( (resolve, reject) => {
      $http.get('/api/things/' + name).then(data => {

        var obj = JSON.parse(data.data);
        var serie = obj.datatable.data;
        for(var i = 0; i < serie.length; i++){
            
            for(var x = 0; x < serie[i].length; x++){
              serie[i][0] = moment(serie[i][0]).valueOf();
            }
        
        }
        resolve(serie);
      });
    })
  }
  
}
/*stockService.$inject = [$http];*/
export default angular.module('meanStockchartAppApp.stockService', [])
  .service('stockService', ['$http', stockService])
  .name;
