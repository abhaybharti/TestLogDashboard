import React from "react";
import DailyTestExecutionCount from "./DailyTestExecutionCount";

import TopFailure from "./TopFailure";
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";
import ChartForSuite from "./ChartForSuite";

const Home = () => {
  const { total, pass, fail } = useStateContext();
  return (
    <div className="mt-12">
      <ChartForSuite />
      <hr />
      <div>
        <div className="singleRow">
          <Header title="Test Summary" />
          <hr />
        </div>
      </div>
      <div className="mb-3">
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="flex flex-wrap lg:flex-nowrap justify-left">
            <div className="bg-white dark:text-black-200 dark:bg-secondary-dark-bg h-8 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-left">
              <div className="flex justify-between items-left">
                <div className="font-bold text-black-600">
                  <p>Test Executed</p>
                  <p>{total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-8 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-left">
              <div className="flex justify-between items-left">
                <div className="font-bold text-green-600">
                  <p>Pass</p>
                  <p>{pass}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:text-red-200 dark:bg-secondary-dark-bg h-8 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-left">
              <div className="flex justify-between items-left">
                <div className="font-bold  text-red-600">
                  <p>Fail</p>
                  <p>{fail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DailyTestExecutionCount />
      <TopFailure />
    </div>
  );
};

export default Home;
