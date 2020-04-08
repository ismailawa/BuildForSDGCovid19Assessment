const { ProcessData } = require('./process');

const covid19ImpactEstimator = (data) => ProcessData(data);

export default covid19ImpactEstimator;

// const data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

// console.log(covid19ImpactEstimator(data));
