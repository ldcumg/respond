import React from "react";

const HomeSkelton = () => {
  return (
    <div className="h-full pb-10">
      <nav className="">
        <ul className="flex gap-[10px] pl-[50px]">
          <div>
            <li className="tabBtn">홈</li>
          </div>
        </ul>
      </nav>
      <main className="borderline h-full w-full overflow-hidden"></main>
    </div>
  );
};

export default HomeSkelton;
