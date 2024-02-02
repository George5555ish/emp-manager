export const generateNewShifts = (prevShift: any) => {
 
  const genericMatches = [
    "Chelsea Vs Southampton",
    "Manchester United Vs Man City",
    "BlackPool Vs Watford",
    "Watford Vs Man City",
    "Arsenal Vs WatFord",
    "Watford Vs Chelsea",
    "BlackPool Vs Chelsea",
    "Liverpool Vs Chelsea",
    "LiverPool Vs Man City",
    "Chelsea Vs Man City",
    "Arsenal Vs WatFord",
  ];
  const randomNum = Math.floor(Math.random() * 11);

  const randomNumFive = Math.floor(Math.random() * 5);
  const newDateArray = prevShift[0].date.split(" ");
  
//   // console.log(newDateArray);
  const newDateTime = newDateArray[3];
  const isTimePastTen = newDateTime.split(":")[0] * 1 >= 22;
  // console.log(isTimePastTen)
  const newShiftDay = newDateArray[1].split(",")[0] * 1;
 
  if (isTimePastTen) {
    //10PM
    // create shifts for the next day
    const fixedShiftDay = newShiftDay >= 30 ? 1 : newShiftDay + 1;
    // console.log(fixedShiftDay);
    const fixedShiftDate = newDateArray
      .join(" ")
      .replace(`${newDateArray[1]}`, fixedShiftDay + ",");
    // reset time to 10 am
    const newShiftTime = "10:00:00";
    const newShiftTimeSecond = "11:00:00";
    const newShiftTimeEnd = "14:00:00";
    const newShiftTimeEndSecond = "15:00:00";
    const finalShiftDate = fixedShiftDate.replace(
      `${newDateArray[3]}`,
      newShiftTime
    );
    const finalShiftEndDate = fixedShiftDate.replace(
      `${newDateArray[3]}`,
      newShiftTimeEnd
    );
    const finalShiftDateTwo = fixedShiftDate.replace(
      `${newDateArray[3]}`,
      newShiftTimeSecond
    );
    const finalShiftEndDateTwo = fixedShiftDate.replace(
      `${newDateArray[3]}`,
      newShiftTimeEndSecond
    );

    return [
      {
        id: prevShift[0].id,
        shiftName: genericMatches[randomNum],
        attendees: prevShift[0].attendees,
        employmentrole:
          randomNum > 4
            ? prevShift[0].employmentrole
            : [...prevShift[0].employmentrole, "Cleaners", "Managers"],
        hourlyrate: prevShift[0].hourlyrate,
        location: genericMatches[randomNum].split("Vs")[randomNum > 4 ? 0 : 1],
        noofhours: prevShift[0].noofhours,
        notes: prevShift[0].notes,
        isshiftended: prevShift[0].isshiftended,
        starttime: new Date(finalShiftDate).toISOString(),
        endtime: new Date(finalShiftEndDate).toISOString(),
      },
      {
        id: prevShift[0].id,
        shiftName: genericMatches[randomNumFive],
        attendees: prevShift[0].attendees,
        employmentrole:
          randomNum > 4
            ? prevShift[0].employmentrole
            : [...prevShift[0].employmentrole, "Cleaners", "Managers"],
        hourlyrate: prevShift[0].hourlyrate,
        location:
          genericMatches[randomNumFive].split("Vs")[randomNum > 4 ? 0 : 1],
        noofhours: prevShift[0].noofhours,
        notes: prevShift[0].notes,
        isshiftended: prevShift[0].isshiftended,
        starttime: new Date(finalShiftDateTwo).toISOString(),
        endtime: new Date(finalShiftEndDateTwo).toISOString(),
      },
    ];
  } else {
    // create a new shift for the next hour on same day
    // console.log('we in the else block')
    const newShiftTime = (newDateTime.split(":")[0] * 1) + 1;
 
    const formattedShiftTime = `${newShiftTime}:00:00`;
    const formattedShiftTimeEnd = `${
      newShiftTime + 4 > 24 ? "0" + (newShiftTime + 4 - 24) : newShiftTime + 4
    }:00:00`;
    const fixedShiftDate = newDateArray
      .join(" ")
      .replace(`${newDateArray[3]}`, formattedShiftTime);
    const fixedShiftDateEnd = newDateArray
      .join(" ")
      .replace(`${newDateArray[3]}`, formattedShiftTimeEnd);
    // if (prevShift.id){ 
        return [
      {
        id: prevShift[0].id,
        shiftName: genericMatches[randomNumFive],
        attendees: prevShift[0].attendees,
        employmentrole:
          randomNum > 4
            ? prevShift[0].employmentrole
            : [...prevShift[0].employmentrole, "Cleaners", "Managers"],
        hourlyrate: prevShift[0].hourlyrate,
        location:
          genericMatches[randomNumFive].split("Vs")[randomNum > 4 ? 0 : 1],
        noofhours: prevShift[0].noofhours,
        notes: prevShift[0].notes,
        isshiftended: prevShift[0].isshiftended,
        startTime: new Date(fixedShiftDate).toISOString(),
        endTime: new Date(fixedShiftDateEnd).toISOString(),
      },
    ];
    // } else return [];
  }
};

export const sortDates = (shifts: any[], direction: 'asc' | 'desc') => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const shiftDatesArray = shifts.map((shift) => {
    const year = shift.endtime.split("T")[0].split("-")[0];
    const month = shift.endtime.split("T")[0].split("-")[1];
    const day = shift.endtime.split("T")[0].split("-")[2];
    const hour = shift.endtime.split("T")[1].split(":")[0];
    const minute = shift.endtime.split("T")[1].split(":")[1];
    const second = shift.endtime.split("T")[1].split(":")[2].split(".")[0];
    const monthInText = months[month - 1];
    const formattedDate = `${monthInText} ${day}, ${year} ${hour}:${minute}:${second}`;

    return {
      date: formattedDate,
      ...shift,
    };
  });
  if (direction == 'desc'){
     return shiftDatesArray.sort(
    (date1: any, date2: any) => new Date(date2.date) - new Date(date1.date)
  );
  } else {
    return shiftDatesArray.sort(
        (date1: any, date2: any) => new Date(date1.date) - new Date(date2.date)
      );
  }
 
};


export const getUpcomingShift = (shifts: any[]) => {
    const filteredDates =  shifts.filter(
        (shift:any, idx:any) =>  {
        //   console.log( new Date(shift.date))
        //   console.log(shift.length) 

          return  new Date(shift.date) > new Date();
        }
      );
    //   console.log('filteredDates')
    //   console.log(filteredDates)
      return filteredDates[0] //shifts have to be sorted in ascending order;
  }