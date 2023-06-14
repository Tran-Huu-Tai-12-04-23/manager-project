import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DropDown from "../Component/DropDown";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";

const LineChart = (props) => {
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData(props.chartData);
    setChartOptions(props.chartOptions);
  }, [props.chartData, props.chartOptions]);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center">
        <h5 className="font-family text-xs font-bold">(Thời gian)</h5>
        {/* <DropDown
          open={open}
          setOpen={setOpen}
          drop={
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="flex justify-center items-center font-bold text-xs"
            >
              <button className="reset">Tháng</button>
              <MdKeyboardArrowDown />
            </div>
          }
        >
          <div className="w-20 flex justify-start font-bold text-xs dark:bg-dark-third bg-light-third p-2 rounded-md pl-2 pr-2">
            <button className="reset">Năm</button>
          </div>
          <div className="flex justify-start  font-bold text-xs dark:bg-dark-third bg-light-third p-2 rounded-md pl-2 pr-2">
            <button className="reset">Tháng</button>
          </div>
          <div className="flex justify-start font-bold text-xs dark:bg-dark-third bg-light-third p-2 rounded-md pl-2 pr-2">
            <button className="reset">Tuần</button>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="p-1 w-fit rounded-full ml-auto mr-auto cursor-pointer hover:bg-slate-800 items-center justify-center flex"
          >
            <MdClose className="text-inherit"></MdClose>
          </div>
        </DropDown> */}
      </div>
      <div
        className="w-full p-4"
        style={{
          height: "60vh",
        }}
      >
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="line"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default LineChart;
