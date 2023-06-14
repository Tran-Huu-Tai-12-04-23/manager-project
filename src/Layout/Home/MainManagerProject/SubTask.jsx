import { FormControl, Select, MenuItem } from "@mui/material";

function SubTask({ data, listPriority }) {
  return (
    <div className=" text-xs cursor-pointer p-2 hover:bg-light-third hover:dark:bg-dark-third rounded-md justify-between items-center flex">
      <li className="">{data.name}</li>

      <select
        value={1}
        className={`${listPriority[0].color} ${listPriority[0].background} cursor-pointer appearance-none reset  p-1 rounded-md h-6 w-12 text-center  text-xs`}
        // onChange={(e) => setPriority(e.target.value)}
      >
        {listPriority.map((pri, index) => {
          return (
            <option
              key={index}
              value={pri.value}
              sx={{
                color: "inherit",
              }}
              className={`${pri.color} ${pri.background} p-4 cursor-pointer rounded-md h-6 w-fit  text-xs`}
            >
              <div
                className={`${pri.color} ${pri.background} p-1 rounded-md h-6 w-fit  text-xs `}
              >
                {pri.name}
              </div>
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SubTask;
