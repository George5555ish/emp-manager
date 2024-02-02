import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData, fetchShiftInfo } from "@/app/lib/data";
// import { useEffect, useState } from 'react';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};
export default async function ShiftCardWrapper() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  const { shiftCount, upcomingShift } = await fetchShiftInfo();

  // const [checkShifts, setCheckShifts] = useState(false);
  // const [ongoingShifts, setOngoingShifts] = useState({})

  // useEffect(() => {
  //    const setCardData = async() => {
  //     // const {
  //     //     totalPaidInvoices,
  //     //     totalPendingInvoices,
  //     //     numberOfInvoices,
  //     //   } = await fetchCardData();
  //     console.log('omo')
  //    }
  //    setCardData()
  // }, [checkShifts])

  // setInterval(() => {
  //     console.log('setInterval');
  // }, 3600)
  return (
    <>
      {/* <ShiftCard title="Ongoing Shift" value={totalPaidInvoices} type="collected" /> */}
      <UpcomingShiftCard
        title="Upcoming shift"
        value={upcomingShift}
        type="pending"
      />
      <ShiftCard title="Total Shifts" value={shiftCount} type="invoices" />
    </>
  );
}

export function UpcomingShiftCard({
  title,
  value,
  type,
}: {
  title: string;
  value: {
    hourlyrate: string;
    location: string;
    shiftname: string;
    starttime: string;
    endtime: string;
  };
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type]; 
  const formattedDay = value.starttime.split('T')[0];

  const formattedStartTimeHour = value.starttime.split('T')[1].split(':')[0];
  const startTimeAmOrPm = Number(formattedStartTimeHour) < 12 ? 'AM': 'PM';
  const formattedEndTimeHour = value.endtime.split('T')[1].split(':')[0];
  const endTimeAmOrPm = Number(formattedEndTimeHour) < 12 ? 'AM': 'PM';
  return (
    <div className="rounded-xl bg-gray-50 p-1 shadow-sm upcoming_card" style={{
      overflow: 'hidden',
    }}>
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
     <div  style={{
          overflow: 'hidden',
        }}>
     <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <div>
          <p
          style={{fontSize: '18px'}}
            className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            Hourly Rate
            <strong style={{paddingLeft: '5px',fontSize: '12px', color: '#2b83a6', fontWeight: 'bold'}}>{value.hourlyrate} GBP</strong>
          </p>
         
        </div>
        <div>
          <p     style={{fontSize: '18px'}}
            className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            Date
            <strong style={{paddingLeft: '5px',fontSize: '14px', color: '#2b83a6', fontWeight: 'bold'}}>{formattedDay}</strong>
          </p>
     
        </div>
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <div>
          <p     style={{fontSize: '18px'}}
            className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            Start Time
            <strong style={{paddingLeft: '5px',fontSize: '14px', color: '#2b83a6', fontWeight: 'bold'}}>{`${formattedStartTimeHour} ${startTimeAmOrPm}`}  </strong>
          </p>
          
        </div>
        <div>
          <p     style={{fontSize: '18px'}}
            className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
          >
            End Time
            <strong style={{paddingLeft: '5px',fontSize: '14px', color: '#2b83a6', fontWeight: 'bold'}}>{`${formattedEndTimeHour} ${endTimeAmOrPm}`}  </strong>
          </p>

        </div>
      </div>
     </div>
    </div>
  );
}

export function ShiftCard({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
