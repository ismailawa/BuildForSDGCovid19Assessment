const getCurrentlyInfected = (reportedCases, impact) => {
  if (impact === 'severe') {
    return reportedCases * 50;
  }
  return reportedCases * 10;
};

// Convert the timeToElapse into days defending period type picked by the user
const periodNormaliser = (periodType, timeToElapse) => {
  if (periodType === 'weeks') {
    return timeToElapse * 7;
  }

  if (periodType === 'months') {
    return timeToElapse * 30;
  }

  return timeToElapse;
};

const getInfectionsByRequestedTime = (data, impact) => {
  const currentlyInfected = getCurrentlyInfected(data.reportedCases, impact);
  const timeToElapse = periodNormaliser('days', data.timeToElapse);
  const factor = Math.floor(timeToElapse / 3);

  return currentlyInfected * (2 ** factor);
};

const getsevereCasesByRequestedTime = (data, impact) => {
  const result = getInfectionsByRequestedTime(data, impact) * (15 / 100);
  return result;
};

const getHospitalBedsByRequestedTime = (data, impact) => {
  const severeCasesByRequestedTime = getsevereCasesByRequestedTime(data, impact);
  const availibleBeds = data.totalHospitalBeds * (35 / 100);
  return availibleBeds - severeCasesByRequestedTime;
};

const getCasesForICUByRequestedTime = (data, impact) => (
  getInfectionsByRequestedTime(data, impact) * (5 / 100)
);

const getCasesForVentilatorsByRequestedTime = (data, impact) => (
  getInfectionsByRequestedTime(data, impact) * (2 / 100)
);


const getDollarsInFlight = (data, impact) => {
  const InfectionsByRequestedTime = getInfectionsByRequestedTime(data, impact);
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const timeToElapse = periodNormaliser(data.periodType, data.timeToElapse);
  return InfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
};

const processData = (data) => (
  {
    data,
    impact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'normal'),
      infectionsByRequestedTime: getInfectionsByRequestedTime(data, 'normal'),
      severeCasesByRequestedTime: getsevereCasesByRequestedTime(data, 'normal'),
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(data, 'normal'),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(data, 'normal'),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(data, 'normal'),
      dollarsInFlight: getDollarsInFlight(data, 'normal')
    },
    severeImpact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'severe'),
      infectionsByRequestedTime: getInfectionsByRequestedTime(data, 'severe'),
      severeCasesByRequestedTime: getsevereCasesByRequestedTime(data, 'severe'),
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(data, 'severe'),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(data, 'severe'),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(data, 'severe'),
      dollarsInFlight: getDollarsInFlight(data, 'severe')
    }
  });

exports.GetSevereCasesByRequestedTime = getsevereCasesByRequestedTime;
exports.GetInfectionsByRequestedTime = getInfectionsByRequestedTime;
exports.PeriodNormaliser = periodNormaliser;
exports.ProcessData = processData;
