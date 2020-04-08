const covid19ImpactEstimator = require('./estimator');

// @ts-ignore
test('should return output object when called', () => {
  // arrange
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
  const output = {
    data: input,
    impact: {
      currentlyInfected: 674 * 10,
      infectionsByRequestedTime: 3533701120
    },
    severeImpact: {
      currentlyInfected: 674 * 50,
      infectionsByRequestedTime: 17668505600
    }
  };
  // act
  const result = covid19ImpactEstimator.default(input);

  // assert
  // @ts-ignore
  expect(result).toEqual(output);
});
