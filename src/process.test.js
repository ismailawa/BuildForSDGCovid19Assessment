const { ProcessData } = require('./process');

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
      currentlyInfected: 674 * 10
    },
    severeImpact: {
      currentlyInfected: 674 * 50
    }
  };
  // act
  const result = ProcessData(input);

  // assert
  // @ts-ignore
  expect(result).toEqual(output);
});
