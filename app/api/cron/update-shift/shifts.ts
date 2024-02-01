import { QueryResultRow } from "@vercel/postgres"

interface IShift {
         id:string,
        shiftName: string,
        startTime: string,
        endTime: string,
        attendees: string[],
        employmentRole: string[]
        hourlyRate: string
        location: string
        noOfHours: string
        notes: string
        isShiftEnded: false
      
}
export const generateNewShifts  = (shifts: QueryResultRow[] ) => {

}