import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  stocks = [];
  newStock = '';

  /*@ngInject*/
  constructor($http, $scope, socket, stockService) {
    this.$http = $http;
    this.socket = socket;
    this.chartConfig = this.getStockConfig();
    this.stockService = stockService;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.stocks = response.data;
        this.socket.syncUpdates('thing', this.stocks);
      });
  }

  setSerie(stock) {

    this.stockService.selectStock(stock.name.toUpperCase()).then(data => {
      this.chartConfig.series[0].setData(data);
    });
   
  }

  addStock() {
    if(this.newStock) {
      this.stockService.selectStock(this.newStock.toUpperCase()).then(data => {

        this.chartConfig.series[0].setData(data);
        console.log(this.prices);
      });

      this.$http.post('/api/things', {
        name: this.newStock.toUpperCase(),
      });
      this.newStock = '';
    }
  }

  deleteStock(stock) {
    event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
    this.$http.delete(`/api/things/${stock._id}`);
  }

  getStockConfig(){
    return Highcharts.chart('chart2',{
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Stock'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b, %y'
            }
        },
        yAxis: {
            title: {
                text: 'Price'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Price',
            data: []
        }]
      });
    }

}

export default angular.module('meanStockchartAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
