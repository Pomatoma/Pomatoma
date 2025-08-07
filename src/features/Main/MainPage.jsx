import React from 'react';
import SelectField from "../../components/SelectField.jsx";
import Button from "../../components/Button.jsx";
import tomato from "../../assets/icons/tomato.svg";
import {useNavigate} from "react-router-dom";
import {useTimerStore} from "../../store/useTimerStore.js";

export default function MainPage() {
    const navigate = useNavigate();
    const {
        studyTime,
        breakTime,
        cycles,
        setStudyTime,
        setBreakTime,
        setCycles,
      } = useTimerStore()

    const handleStart = () => {
        if (cycles < 1) {
           return alert("반복횟수를 1 이상으로 입력해주세요.")
        }
        else {
            navigate('/timer');
        }
    }
    return (
      <>
          <div className="items-center justify-items-center">
              <p className="text-4xl font-bold mb-20 mt-20">루틴 설정하기</p>
              <div className="flex flex-row justify-between w-65 mb-5">
                  <span className="text-lg">스터디 시간</span>
                  <SelectField value={studyTime} onChange={setStudyTime} />
              </div>
              <div className="flex flex-row justify-between w-65 mb-5">
                  <span className="text-lg">쉬는 시간</span>
                  <SelectField value={breakTime} onChange={setBreakTime} />
              </div>
              <div className="flex flex-row justify-between w-65 mb-20">
                  <span className="text-lg">반복 횟수</span>
                  <input
                      type="number"
                      min="1"
                      value={cycles}
                      onChange={(e) => setCycles(Number(e.target.value))}
                      className="rounded-sm border border-[#FF5B5E] w-40 h-7 px-2"
                  />
              </div>
              <div className="items-center justify-items-center">
                  <Button size='md' filled='filled' onClick={handleStart}>
                  시작하기
                  </Button>
              </div>
              <div>
                  <img
                      src={tomato}
                      className="absolute bottom-5 right-10 w-20 h-20"
                  />
              </div>
          </div>
      </>
  );
}
