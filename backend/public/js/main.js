const input = {
  region: {

    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71

  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(input)
};

const getEstimate = async (option) => {
  const response = await fetch('/api/v1/on-covid-19/json', option);
  const data = await response.json();
  // eslint-disable-next-line no-console
  console.log(data);
  $('#estimateDisplayModal').modal();
};

// @ts-ignore
document.getElementById('data-go-estimate').addEventListener('click', (event) => {
  event.preventDefault();
  getEstimate(options);
});
