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
      infectionsByRequestedTime: 3533701120,
      severeCasesByRequestedTime: 3533701120 * (15 / 100),
      hospitalBedsByRequestedTime: (1380614 * (35 / 100)) - (3533701120 * (15 / 100)),
      casesForICUByRequestedTime: null,
      casesForVentilatorsByRequestedTime: null,
      dollarsInFlight: null
    },
    severeImpact: {
      currentlyInfected: 674 * 50,
      infectionsByRequestedTime: 17668505600,
      severeCasesByRequestedTime: 17668505600 * (15 / 100),
      hospitalBedsByRequestedTime: (1380614 * (35 / 100)) - (17668505600 * (15 / 100)),
      casesForICUByRequestedTime: null,
      casesForVentilatorsByRequestedTime: null,
      dollarsInFlight: null
    }
  };
  // act
  const result = covid19ImpactEstimator.default(input);

  // assert
  // @ts-ignore
  expect(result).toEqual(output);
});
