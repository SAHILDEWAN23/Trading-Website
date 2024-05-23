import React from "react";
import ReactApexChart from "react-apexcharts";


class HomeSalesRevenueChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      	series: [{
			name: "Persent",
			data: [60, 70, 80, 50, 60, 90],		
	  	},
	  	{
			name: "Visitors",
			data: [40, 50, 40, 60, 90, 90],
	  	}],
      options: {
        chart: {
			height: 400,
          	type: "area",
			group: 'social',
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
        },
		plotOptions: {
			// bar: {
			// 	borderRadius: 6,	
			// 	columnWidth: '25%',	
			// 	colors: {
			// 		backgroundBarColors: ['#3B444D', '#3B444D', '#3B444D', '#3B444D','#3B444D','#3B444D','#3B444D','#3B444D'],
			// 		backgroundBarOpacity: 1,
			// 		backgroundBarRadius: 5,
			// 	},
			// 	distributed: true

			// },
		},
        colors:['#13B497'],
        legend: {
			show: false
		},
		fill: {
          opacity: 1,
        },
        dataLabels: {
			enabled: false,	
		},
        stroke: {
			width: [3, 3, 3],
			colors:['var(--secondary)','var(--primary)'],
			curve: 'smooth',
		},
        legend: {
			show:false,
		},
		markers: {
			size: [2,2],
			strokeWidth: [4,4],
			strokeColors: ['var(--secondary)','var(--primary)'],
			border:2,
			radius: 1,
			colors:['#fff','#fff','#fff'],
			hover: {
			  size: 6,
			}
		},
		xaxis: {
			categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			labels: {
				style: {
					colors: '#3E4954',
					fontSize: '14px',
					fontFamily: 'Poppins',
					fontWeight: 100,					
			  	},
			},
			axisBorder:{
				show: false,
			}
		},
		yaxis: {
			labels: {
				minWidth: 20,
				offsetX:-16,
				style: {
				  colors: '#3E4954',
				  fontSize: '14px',
				  fontFamily: 'Poppins',
				  fontWeight: 100,				  
				},
			},
		},
		fill: {
			colors:['#fff','#fff'],
			type:'gradient',
			opacity: 1,
			gradient: {
				shade:'light',
				shadeIntensity: 1,
				colorStops: [ 
				  [
					{
					  offset: 0,
					  color: '#fff',
					  opacity: 0
					},
					{
					  offset: 0.6,
					  color: 'var(--primary)',
					  opacity: 0
					},
					{
					  offset: 100,
					  color: 'var(--primary)',
					  opacity: 0
					}
				  ],
				  [
					{
					  offset: 0,
					  color: 'var(--primary)',
					  opacity: .4
					},
					{
					  offset: 50,
					  color: 'var(--primary)',
					  opacity: 0.25
					},
					{
					  offset: 100,
					  color: 'var(--primary)',
					  opacity: 0
					}
				  ]
				]

		  },
		},
		colors:['#1EA7C5','#FF9432'],
		grid: {
			borderColor: 'rgba(221, 221, 221,0.1)',
			xaxis: {
			  lines: {
				show: true
			  }
			},
			yaxis: {
			  lines: {
				show: true
			  }
			},
		},
		responsive: [{
			breakpoint: 1602,
			options: {
				markers: {
					 size: [6,6,4],
					 hover: {
						size: 7,
					  }
				},chart: {
				height: 230,
				},	
			},
			
		}]
      },
    };
  }

	render() {
		return (
			<div id="activity">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="area"
				  height={400}
				/>
			</div>
		);
	}
}

export default HomeSalesRevenueChart;
