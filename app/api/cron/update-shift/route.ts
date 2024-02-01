import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server'
import { generateNewShifts } from './shifts';
const {v4} = require('uuid')
const fixDateTimes = (startHour:number, endHour:number) => {
  const dateMonth = new Date().getMonth()
  const dateYear = new Date().getFullYear()
  const startDateIso = `${dateYear}-${dateMonth + 1}-09T${startHour}:00:00.000Z`;
    const endDateIso = `${dateYear}-${dateMonth + 1}-09T${endHour}:00:00.000Z` 
 
    return [startDateIso, endDateIso]
}
const shifts = [
  {     id:v4(),
    shiftName: 'Chelsea Vs Watford',
    startTime: fixDateTimes(10,14)[0],
    endTime: fixDateTimes(10,14)[1],
    // attendees: [...customers.map(customer => customer.id)],
    employmentRole: ['Safety Steward', 'SIA Licensed','Cleaners'],
    hourlyRate: '10.90',
    location: 'Chelsea',
    noOfHours: 4,
    notes: 'Please come on time and the right attire',
    isShiftEnded: false
  },  {     id:v4(),
    shiftName: 'Chelsea Vs Arsenal',
    startTime: fixDateTimes(12,16)[0],
    endTime: fixDateTimes(10,14)[1],
    // attendees: [...customers.map(customer => customer.id)],
    employmentRole: ['Safety Steward', 'SIA Licensed'],
    hourlyRate: '10.90',
    location: 'Chelsea',
    noOfHours: 4,
    notes: 'Please come on time and the right attire',
    isShiftEnded: false
  },
]
export async function GET(request:any) {
    const formatCurrency = (amount: number) => {
        return (amount / 100).toLocaleString('en-GB', {
          style: 'currency',
          currency: 'GBP',
        });
      };  
        try {
          // You can probably combine these into a single SQL query
          // However, we are intentionally splitting them to demonstrate
          // how to initialize multiple queries in parallel with JS.
          const noOfShifts = sql`SELECT * FROM shifts`; 
       
          const data = await Promise.all([
            noOfShifts, 
           
          ]); 
          console.log(data[0].rows);
          const sqlShifts = data[0].rows;

          const newShifts = generateNewShifts(shifts)
            
        //   const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        //   const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
      
        //   return {
        //     numberOfCustomers,
        //     numberOfInvoices,
        //     totalPaidInvoices,
        //     totalPendingInvoices,
        //   };
 
      return NextResponse.json({ hello:'from the other side' })
 
        //res.status(200).json({ message: 'Hello from shift.js!' })
        } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to card data.');
        }
      
      
     
}

export async function POST(request:any) {
 
  try {
    // We are basicaly seeding new shifts here. call this api on cron job
     
    const noOfShifts = sql`SELECT * FROM shifts`; 
    const data = await Promise.all([
      noOfShifts, 
    ]); 
    console.log(data[0].rows);
      
  //   const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
  //   const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

  //   return {
  //     numberOfCustomers,
  //     numberOfInvoices,
  //     totalPaidInvoices,
  //     totalPendingInvoices,
  //   };

return NextResponse.json({ hello:'from the other side' })

  //res.status(200).json({ message: 'Hello from shift.js!' })
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }


}