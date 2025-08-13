import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { getUserDailyRecord } from '../api/userStudyRecordApi';
import GreenTomato from '../assets/icons/tomato-green.svg'; //1~3
import YellowTomato from '../assets/icons/tomato-yellow.svg'; //4~6
import RedTomato from '../assets/icons/tomato-red.svg'; //7~

const tomatoIcons = {
  green: <img src={GreenTomato} alt="green tomato" className='w-4 h-4' />,
  yellow: <img src={YellowTomato} alt="yellow tomato" className='w-4 h-4' />,
  red: <img src={RedTomato} alt="red tomato" className='w-4 h-4' />,
}
export default function Calender() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [dailyRecord, setDailyRecord] = useState(null);
  const { userInfo } = useAuthStore();

  useEffect(() => {
    if(userInfo?.userUid) {
      const fetchUserDailyRecord = async () => {
        const record = await getUserDailyRecord(userInfo?.userUid);
        setDailyRecord(record);
      }
      fetchUserDailyRecord();
    }
  },[userInfo])

  // 해당 월/일 구하는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  // 날짜에 해당하는 토마토 아이콘 결정 함수
  const getTomatoIcon = (month, day) => {
    if (!dailyRecord) return null;
    
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayRecord = dailyRecord[dateKey];
    
    if (!dayRecord || dayRecord.count === 0) return null;
    
    const count = dayRecord.count;
    if (count >= 1 && count <= 3) return tomatoIcons.green;
    if (count >= 4 && count <= 6) return tomatoIcons.yellow;
    if (count >= 7) return tomatoIcons.red;
    
    return null;
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
                      {Array.from({length: daysInMonth}).map((_, dayIndex) => {
                        const currentDay = dayIndex + 1;
                        const tomatoIcon = getTomatoIcon(currentMonth, currentDay);
                        
                        return (
                          <div
                              key={dayIndex}
                              className="w-6 h-8 border border-gray-300 flex flex-col items-center justify-start text-[10px]"
                          >
                            <div>{currentDay}</div>
                            {tomatoIcon && (
                              <div>
                                {tomatoIcon}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
              );
            })}
        </div>
      </div>
  );
}
