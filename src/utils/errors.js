module.exports = {
  notFound: { status: 404, message: 'Not Found Contracts' },
  balanceError: {
    status: 400,
    message: 'There is not enough founds in your balance'
  },
  jobPaid: { status: 400, message: 'Job Paid' },
  amountError: {
    status: 400,
    message: 'Deposit could not be more than 25% his total of jobs to pay'
  },
  badRequest: { status: 400, message: 'Bad Request' }
};
