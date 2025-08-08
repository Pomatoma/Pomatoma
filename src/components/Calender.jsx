import React, { useState } from 'react';

export default function Calender() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  // 해당 월/일 구하는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }
  
  return (
    <div className='w-full h-full overflow-auto max-h-[500px]'>
      <div className='min-w-fit p-4'>
      {
        Array.from({ length: 12 }).map((_, monthIndex) => {
          const currentMonth = monthIndex + 1;
          const daysInMonth = getDaysInMonth(year, currentMonth);
          
          return (
            <div key={monthIndex} className=''>
              <h2 className=''>
                {currentMonth}
              </h2>
              <div className=''>
                {
                  Array.from({ length: 31 }).map((_, dayIndex) => {
                    const dayNumber = dayIndex + 1;
                    const isValidDay = dayNumber <= daysInMonth;
                    
                    return (
                      <div 
                        key={dayIndex} 
                      >
                        {isValidDay && dayNumber}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}
