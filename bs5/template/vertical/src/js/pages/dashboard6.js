$(function () {

  'use strict';

var options = {
          series: [{
          name: 'CS',
          data: [44, 55, 41, 67, 22, 43, 44]
        }, {
          name: 'Mathematics',
          data: [13, 23, 20, 8, 13, 27, 13]
        }, {
          name: 'IT',
          data: [23, 17, 12, 9, 15, 24, 18]
        }, {
          name: 'DS',
          data: [23, 12, 12, 15, 12, 5, 11]
        }, {
          name: 'Business',
          data: [14, 25, 18, 8, 5, 11, 14]
        }],
          chart: {
      foreColor:"#bac0c7",
          type: 'bar',
          height: 305,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],   
    grid: {
      show: true,
      borderColor: '#f7f7f7',      
    },
    colors:['#0052cc', '#04a08b', '#00baff', '#ff9920', '#ff562f'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '15%',
        colors: {
        backgroundBarColors: ['#f0f0f0'],
        backgroundBarOpacity: 1,
      },
          },
        },
        dataLabels: {
          enabled: false
        },
 
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Set', 'Sun'],
        },
        legend: {
          show: true,
      position: 'top',
          horizontalAlign: 'center',
        },
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(document.querySelector("#charts_widget_2_chart"), options);
        chart.render();

  
  var options = {
          series: [{
          name: 'Lesson',
          data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 90]
        }, {
          name: 'Task',
          data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 40]
        }],
          chart: {
      foreColor:"#bac0c7",
          type: 'bar',
          height: 365,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],   
    grid: {
      show: true,
      borderColor: '#f7f7f7',      
    },
    colors:['#6993ff', '#f64e60'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '20%',
        colors: {
        backgroundBarColors: ['#f0f0f0'],
        backgroundBarOpacity: 1,
      },
          },
        },
        dataLabels: {
          enabled: false
        },
 
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        legend: {
          show: true,
      position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(document.querySelector("#charts_widget_1_chart"), options);
        chart.render();

  

  var options = {
          series: [44, 55],
          chart: {
        
          type: 'donut',
        },
    labels: ["Boys", "Girls"],
        dataLabels: {
          enabled: false
        },
        legend: {
      position: 'bottom',
          horizontalAlign: 'center', 
        },
    colors: colors,
        responsive: [{
          breakpoint: 1500,
          options: {
            chart: {
              width: 250,
            },
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#pass_chart"), options);
        chart.render();



  
}); // End of use strict
 


