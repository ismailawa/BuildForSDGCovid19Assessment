const { ProcessData, PeriodNormaliser, GetInfectionsByRequestedTime } = require('./process');
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
    currentlyInfected: input.reportedCases * 10,
    infectionsByRequestedTime: input.reportedCases * 10 * (2 ** Math.floor(input.timeToElapse / 3)),
    severeCasesByRequestedTime:
    input.reportedCases * 10 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.15,
    hospitalBedsByRequestedTime:
    (input.totalHospitalBeds * 0.35) - (input.reportedCases
        * 10 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.15),
    casesForICUByRequestedTime:
    input.reportedCases * 10 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.05,
    casesForVentilatorsByRequestedTime:
    input.reportedCases * 10 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.02,
    dollarsInFlight: input.reportedCases
    * 10 * (2 ** Math.floor(input.timeToElapse / 3))
    * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * input.timeToElapse

  },
  severeImpact: {
    currentlyInfected: input.reportedCases * 50,
    infectionsByRequestedTime: input.reportedCases * 50 * (2 ** Math.floor(input.timeToElapse / 3)),
    severeCasesByRequestedTime: input.reportedCases
    * 50 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.15,
    hospitalBedsByRequestedTime: (input.totalHospitalBeds * 0.35)
    - (input.reportedCases * 50 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.15),
    casesForICUByRequestedTime: input.reportedCases * 50
    * (2 ** Math.floor(input.timeToElapse / 3)) * 0.05,
    casesForVentilatorsByRequestedTime: input.reportedCases
    * 50 * (2 ** Math.floor(input.timeToElapse / 3)) * 0.02,
    dollarsInFlight: input.reportedCases * 50 * (2 ** Math.floor(input.timeToElapse / 3))
    * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD * input.timeToElapse
  }
};

// @ts-ignore
test('should return output object when called', () => {
  // act
  const result = ProcessData(input);

  // assert
  // @ts-ignore
  expect(result).toEqual(output);
});

// @ts-ignore
test('should return normalised days when timeElapse is give', () => {
  const period = PeriodNormaliser('days', 28);
  // @ts-ignore
  expect(period).toBe(28);
});

// @ts-ignore
test('should return getInfectionsByRequestedTime give time elapse', () => {
  const result = GetInfectionsByRequestedTime(input, 'normal');
  // @ts-ignore
  expect(result).toBe(3533701120);
});
