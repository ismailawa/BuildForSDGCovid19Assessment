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
      currentlyInfected:
      input.reportedCases * 10,
      infectionsByRequestedTime:
      input.reportedCases * 10 * (2 ** Math.trunc(input.timeToElapse / 3)),
      severeCasesByRequestedTime:
      input.reportedCases * 10 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.15,
      hospitalBedsByRequestedTime: Math.trunc(
        (input.totalHospitalBeds * 0.35)
      - (input.reportedCases * 10
          * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.15)
      ),
      casesForICUByRequestedTime:
      input.reportedCases * 10 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.05,
      casesForVentilatorsByRequestedTime: Math.trunc(
        input.reportedCases * 10 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.02
      ),
      dollarsInFlight:
      ((input.reportedCases * 10 * (
        2 ** Math.trunc(input.timeToElapse / 3)
      ) * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD) / input.timeToElapse).toFixed(2)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime:
      input.reportedCases * 50 * (2 ** Math.trunc(input.timeToElapse / 3)),
      severeCasesByRequestedTime:
      input.reportedCases * 50 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.15,
      hospitalBedsByRequestedTime: Math.trunc(
        (input.totalHospitalBeds * 0.35)
      - (input.reportedCases * 50 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.15)
      ),
      casesForICUByRequestedTime:
      input.reportedCases * 50 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.05,
      casesForVentilatorsByRequestedTime: Math.trunc(
        input.reportedCases * 50 * (2 ** Math.trunc(input.timeToElapse / 3)) * 0.02
      ),
      dollarsInFlight:
      ((input.reportedCases * 50 * (
        2 ** Math.trunc(input.timeToElapse / 3)
      ) * input.region.avgDailyIncomePopulation
      * input.region.avgDailyIncomeInUSD) / input.timeToElapse).toFixed(2)
    }
  };
  // act
  const result = covid19ImpactEstimator.default(input);

  // assert
  // @ts-ignore
  expect(result).toEqual(output);
});
