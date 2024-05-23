import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

class Doughnutchart extends Component {
	
   render() {
      const data = {
			defaultFontFamily: 'Poppins',
			weight: 5,
			datasets: [{
				data: [35, 25, 25,15],
				borderWidth: 5, 
				borderColor: "rgba(47,54,61,1)",
				backgroundColor: [
					"rgba(175, 54, 54, 1)",
					"rgba(60, 101, 245, 1)",
					"rgba(27, 211, 68, 1)",
					"rgba(255, 247, 66, 1)"
				],
				hoverBackgroundColor: [
					"rgba(175, 54, 54, 0.5)",
					"rgba(60, 101, 245, 0.5)",
					"rgba(27, 211, 68, 0.5)",
					"rgba(255, 247, 66, 0.5)"
				]

			}],
      };
		const options = {
			plugins:{
				responsive: true,
					
			},	
			cutout: '60%',
			weight: 1,	
			//cutoutPercentage: 60,
			
			maintainAspectRatio: false
		};

      return (
         <>
            <Doughnut data={data} height={60} options={options} />
         </>
      );
   }
}

export default Doughnutchart;
