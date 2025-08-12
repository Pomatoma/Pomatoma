import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { getUserDailyRecord } from '../api/userStudyRecordApi';

export default function Calender() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const { userInfo } = useAuthStore();

  useEffect(() => {
    console.log('userInfo', userInfo);
    if(userInfo?.userUid) {
      const fetchUserDailyRecord = async () => {
        const record = await getUserDailyRecord(userInfo?.userUid);
        console.log(record);
      }
      fetchUserDailyRecord();
    }
  },[userInfo])

  // 해당 월/일 구하는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  return (
      <div className='w-full overflow-x-auto max-h-[600px] min-w-[900px]'>
        <div className='min-w-fit p-5'>
          {
            Array.from({length: 12}).map((_, monthIndex) => {
              const currentMonth = monthIndex + 1;
              const daysInMonth = getDaysInMonth(year, currentMonth);

              return (
                  <div key={monthIndex} className="flex items-center mb-2">
                    {/*월 표시*/}
                    <div className="w-8 text-xs font-bold">{currentMonth}</div>

                    {/* 날짜 표시 */}
                    <div className="flex flex-wrap gap-x-0.5">
                      {Array.from({length: daysInMonth}).map((_, dayIndex) => (
                          <div
                              key={dayIndex}
                              className="w-6 h-8 border border-gray-300 flex justify-center text-[10px]"
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
