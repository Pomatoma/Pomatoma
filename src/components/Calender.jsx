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
    <div className='w-full h-full overflow-auto max-w-[1200px] max-h-[500px]'>
      <div className='min-w-fit p-4'>
      {
        Array.from({ length: 12 }).map((_, monthIndex) => {
          const currentMonth = monthIndex + 1;
          const daysInMonth = getDaysInMonth(year, currentMonth);

          return (
              <div key={monthIndex} className="flex items-center mb-2">
                {/*월 표시*/}
                <div className="w-8 text-sm font-bold">{currentMonth}</div>

                {/* 날짜 표시 */}
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: daysInMonth }).map((_, dayIndex) => (
                      <div
                          key={dayIndex}
                          className="w-8 h-10 border border-gray-300 flex justify-center text-xs"
                      >
                        {dayIndex + 1}
                      </div>
                  ))}
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
}
