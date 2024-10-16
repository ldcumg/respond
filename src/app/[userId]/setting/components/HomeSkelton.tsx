import React from "react";

const HomeSkelton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden p-[30px]">
      <div className="mb-[40px] flex">
        <h1 className="pageTitle">나의 홈피</h1>
      </div>
      <nav className="">
        <ul className="flex gap-[5px]">
          <div>
            <li className="tabBtn">홈</li>
          </div>
        </ul>
      </nav>
      <main className="borderline no-radius flex h-full w-full items-center justify-center overflow-hidden">
        <p>나만의 홈피를 추가해보세요!</p>
      </main>
    </div>
  );
};

export default HomeSkelton;
