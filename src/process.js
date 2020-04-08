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

const processData = (data) => (
  {
    data,
    impact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'normal'),
      infectionsByRequestedTime: getInfectionsByRequestedTime(data, 'normal')
    },
    severeImpact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'severe'),
      infectionsByRequestedTime: getInfectionsByRequestedTime(data, 'severe')
    }
  });

exports.GetInfectionsByRequestedTime = getInfectionsByRequestedTime;
exports.PeriodNormaliser = periodNormaliser;
exports.ProcessData = processData;
