const getCurrentlyInfected = (reportedCases, impact) => {
  if (impact === 'severe') {
    return reportedCases * 50;
  }
  return reportedCases * 10;
};

const processData = (data) => (
  {
    data,
    impact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'null')
    },
    severeImpact: {
      currentlyInfected: getCurrentlyInfected(data.reportedCases, 'severe')
    }
  });


exports.ProcessData = processData;
