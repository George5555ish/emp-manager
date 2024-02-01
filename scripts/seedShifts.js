const { db } = require("@vercel/postgres"); 
const {v4} = require('uuid')
const fixDateTimes = (startHour, endHour) => {
  const dateMonth = new Date().getMonth()
  const dateYear = new Date().getFullYear()
  const startDateIso = `${dateYear}-${dateMonth + 1}-09T${startHour}:00:00.000Z`;
    const endDateIso = `${dateYear}-${dateMonth + 1}-09T${endHour}:00:00.000Z` 
 
    return [startDateIso, endDateIso]
}
const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];
const shifts = [
  {     id:v4(),
    shiftName: 'Chelsea Vs Watford',
    startTime: fixDateTimes(10,14)[0],
    endTime: fixDateTimes(10,14)[1],
    attendees: [...customers.map(customer => customer.id)],
    employmentRole: ['Safety Steward', 'SIA Licensed'],
    hourlyRate: '10.90',
    location: 'Chelsea',
    noOfHours: 4,
    notes: 'Please come on time and the right attire',
    isShiftEnded: false
  },  {     id:v4(),
    shiftName: 'Chelsea Vs Arsenal',
    startTime: fixDateTimes(12,16)[0],
    endTime: fixDateTimes(10,14)[1],
    attendees: [...customers.map(customer => customer.id)],
    employmentRole: ['Safety Steward', 'SIA Licensed'],
    hourlyRate: '10.90',
    location: 'Chelsea',
    noOfHours: 4,
    notes: 'Please come on time and the right attire',
    isShiftEnded: false
  },
]
const shiftsNotification = [
  {
    id:v4(),
    shiftName: shifts[0].shiftName,
    shiftDate: shifts[0].startTime,
    description: 'Chelsea Vs Watford shift just started',
    isRead: false,
  }
]

 
async function seedShifts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "shifts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS shifts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        shiftName VARCHAR(255) NOT NULL,
        startTime VARCHAR(255) NOT NULL,
        endTime VARCHAR(255) NOT NULL,
        attendees TEXT [],
        employmentRole TEXT [],
        hourlyRate VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        noOfHours INTEGER NOT NULL, 
        notes VARCHAR(255) NOT NULL,
        isShiftEnded BOOLEAN 
      );
    `;

    console.log(`Created "shifts" table`);

    // Insert data into the "shifts" table
    const insertedShifts = await Promise.all(
      shifts.map(async (shift) => {
        return client.sql`
        INSERT INTO shifts (id,
        shiftName,
        startTime,
        endTime,
        attendees,
        employmentRole,
        hourlyRate,
        location,
        noOfHours, 
        notes,
        isShiftEnded)
        VALUES (${shift.id}, ${shift.shiftName}, ${shift.startTime}, ${shift.endTime}, ${shift.attendees}, ${shift.employmentRole}, ${shift.hourlyRate},${shift.location}, ${shift.noOfHours}, ${shift.notes}, ${shift.isShiftEnded})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedShifts.length} Shifts`);

    return {
      createTable,
      shifts: insertedShifts,
    };
  } catch (error) {
    console.error("Error seeding shifts:", error);
    throw error;
  }
}

async function seedNotifications(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "notifications" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    shiftName VARCHAR(255) NOT NULL,
    shiftDate VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    isRead BOOLEAN 
  );
`;

    console.log(`Created "notifications" table`);

    // Insert data into the "notifications" table
    const insertedInvoices = await Promise.all(
        shiftsNotification.map(
        (notification) => client.sql`
        INSERT INTO notifications (id, shiftName, shiftDate, description,isRead)
        VALUES (${notification.id}, ${notification.shiftName}, ${notification.shiftDate}, ${notification.description}, ${notification.isRead})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${shiftsNotification.length} notifications`);

    return {
      createTable,
      notifications: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}
 
async function main() {
  const client = await db.connect();

  await seedShifts(client); 
  await seedNotifications(client); 

  await client.end();
} 
main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
