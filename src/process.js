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


// This compute  number of infected base on reported cases.
const getCurrentlyInfected = (reportedCases, impact) => {
  if (impact === 'severe') {
    return reportedCases * 50;
  }
  return reportedCases * 10;
};


// This function compute infections by requested time
const getInfectionsByRequestedTime = (data, impact) => {
  const currentlyInfected = getCurrentlyInfected(data.reportedCases, impact);
  const timeToElapse = periodNormaliser(data.periodType, data.timeToElapse);
  const factor = Math.floor(timeToElapse / 3);

  return currentlyInfected * (2 ** factor);
};


// this function compute Severe cases by requested time
const getsevereCasesByRequestedTime = (data, impact) => {
  const result = getInfectionsByRequestedTime(data, impact) * (15 / 100);
  return result;
};


// This function compute available beds
const getHospitalBedsByRequestedTime = (data, impact) => {
  const severeCasesByRequestedTime = getsevereCasesByRequestedTime(data, impact);
  const availableBeds = data.totalHospitalBeds * (35 / 100);
  return Math.floor(availableBeds - severeCasesByRequestedTime) - 1;
};


// This function compute cases required ICU by requested time
const getCasesForICUByRequestedTime = (data, impact) => (
  getInfectionsByRequestedTime(data, impact) * (5 / 100)
);


// This function compute cases that required ventilators
const getCasesForVentilatorsByRequestedTime = (data, impact) => (
  Math.floor(getInfectionsByRequestedTime(data, impact) * (2 / 100))
);


// Estimate how much money the economy is likely to lose over the said period.
const getDollarsInFlight = (data, impact) => {
  const InfectionsByRequestedTime = getInfectionsByRequestedTime(data, impact);
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const timeToElapse = periodNormaliser(data.periodType, data.timeToElapse);
  return InfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
};

// This the main function that return the final output base on inputed data
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
