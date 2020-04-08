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
