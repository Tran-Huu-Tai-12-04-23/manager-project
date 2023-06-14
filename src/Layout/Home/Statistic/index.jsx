import LineChart from "../../../Component/LineChart";
import { MdKeyboardArrowLeft } from "react-icons/md";
export const lineChartDataTotalSpent = [
  {
    name: "Thời gian làm việc ",
    data: [50, 64, 48, 66, 49, 68, 50, 64, 48, 66, 49, 68],
  },
  {
    name: "Số project hoàn thành",
    data: [30, 40, 24, 46, 20, 46, 30, 40, 24, 46, 20, 46],
  },
];

export const lineChartOptionsTotalSpent = {
  chart: {
    toolbar: {
      show: true,
      background: "red",
      foreground: "#000",
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    type: "line",
  },
  xaxis: {
    type: "numeric",
    categories: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  legend: {
    show: true,
  },
  grid: {
    show: false,
    column: {
      color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#39B8FF"],
};

function Statistic() {
  return (
    <div className="w-full p-4">
      <div className="flex justify-start items-center mb-5 w-full hover:text-gray-400 cursor-pointer">
        <MdKeyboardArrowLeft className="text-2xl cursor-pointer"></MdKeyboardArrowLeft>
        <h5 className="font-family text-md font-bold cursor-pointer">
          Quay lại
        </h5>
      </div>
      <div className=" p-4 dark:bg-dark-second bg-light-second rounded-xl">
        <LineChart
          chartData={lineChartDataTotalSpent}
          chartOptions={lineChartOptionsTotalSpent}
        />
      </div>
    </div>
  );
}

export default Statistic;
