// createEmployeeRecord - Crea un objeto employee record a partir de un Array con firstName, familyName, title y payPerHour.
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // createEmployeeRecords - Crea varios employee records a partir de una Array de Arrays.
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employeeArray => createEmployeeRecord(employeeArray));
  }
  
  // createTimeInEvent - Registra el tiempo en que un empleado entra.
  function createTimeInEvent(dateTimeString) {
  const [date, time] = dateTimeString.split(" ");
  const [hour, minute] = time.split(":");
  
  this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });
  
  return this;
}
  
  // createTimeOutEvent - Registra el tiempo en que un empleado sale.
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return this;
  }
  
  // hoursWorkedOnDate - Calcula las horas trabajadas por un empleado en una fecha específica.
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // wagesEarnedOnDate - Calcula el salario ganado por un empleado en una fecha específica.
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  // allWagesFor - Calcula el salario total ganado por un empleado.
  function wagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    const wages = dates.map(date => wagesEarnedOnDate.call(employeeRecord, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  // findEmployeeByFirstName - Encuentra un empleado por su primer nombre.
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // calculatePayroll - Calcula el salario total ganado por todos los empleados.
  function calculatePayroll(employeeRecords) {
    const wages = employeeRecords.map(record => allWagesFor.call(record));
    return wages.reduce((total, wage) => total + wage, 0);
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

