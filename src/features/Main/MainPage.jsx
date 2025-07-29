import React from 'react';
import SelectField from "../../components/SelectField.jsx";
import {Input} from "react-select/animated";
import Button from "../../components/Button.jsx";

export default function MainPage() {
  return (
      <>
          <div className="items-center justify-items-center">
              <p className="text-4xl font-bold mb-20">루틴 설정하기</p>
              <div className="flex flex-row justify-between w-64 mb-5">
                  <span>스터디 시간</span>
                  <SelectField/>
              </div>
              <div className="flex flex-row justify-between w-64 mb-5">
                  <span>쉬는 시간</span>
                  <SelectField/>
              </div>
              <div className="flex flex-row justify-between w-64 mb-20">
                  <span>반복 횟수</span>
                  <input className="rounded-sm border border-[#FF5B5E] w-35" />
              </div>
              <Button size='md' filled='filled' disabled={true} onClick={() => {}}>
                  시작하기
              </Button>
          </div>
      </>
  );
}
