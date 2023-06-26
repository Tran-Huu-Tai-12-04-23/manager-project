import { AvatarGroup, Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { projectDetailAction } from ".././Store/projectDetailSlice";
import { useDispatch } from "react-redux";

function compareDatesWithoutTime(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return 0; // Both dates are the same
  } else if (
    year1 > year2 ||
    (year1 === year2 && month1 > month2) ||
    (year1 === year2 && month1 === month2 && day1 > day2)
  ) {
    return 1; // Date 1 is after Date 2
  } else if (
    year1 < year2 ||
    (year1 === year2 && month1 < month2) ||
    (year1 === year2 && month1 === month2 && day1 < day2)
  ) {
    return 2; // Date 1 is before Date 2
  } else {
    return -1; // Invalid input
  }
}

function CardProject({ data, setActive }) {
  const [date, setDate] = useState(new Date(data.date_end));
  const [color, setColor] = useState("design");
  const [late, setLate] = useState(false);
  const [numberDay, setNumberDay] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeDiff = Math.abs(date - new Date());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setNumberDay(daysDiff);
    const checkDate = compareDatesWithoutTime(date, new Date());
    console.log(checkDate);
    if (checkDate === 2) {
      setLate(true);
    } else {
      setLate(false);
    }
  }, [date]);

  const handleChooseProject = () => {
    dispatch(projectDetailAction.initProjectDetail(data));
    setActive(1);
  };

  return (
    <div className="w-full h-fit dark:bg-dark-second bg-light-second p-2 rounded-md">
      <h5 className="font-family text-md capitalize">{data.name}</h5>
      <h5 className="font-family text-xs mt-2 mb-2 text-blur-light dark:text-blur-dark">
        Ngày hết hạn :
        <span className={`ml-2 text-design`}>{date.toLocaleDateString()}</span>
      </h5>

      {!late && numberDay !== 1 && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-ux`}>
          Còn {numberDay} ngày nữa hết hạn
        </h5>
      )}
      {numberDay === 1 && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-design`}>
          Hôm nay
        </h5>
      )}
      {late && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-red-600`}>
          Đã hết hạn
        </h5>
      )}

      <div className="w-full pl-2 mt-2">
        <AvatarGroup
          total={data.member.length}
          sx={{
            fontSize: ".725rem",
            width: "unset",
            float: "right",
            marginRight: ".5rem",
            "& div": {
              width: 30,
              height: 30,
            },
          }}
        >
          {data.member.slice(0, 2).map((mem, index) => {
            return (
              <Tooltip
                key={index}
                title={mem.displayName ? mem.displayName : mem.email}
              >
                <Avatar
                  alt={mem.displayName ? mem.displayName : mem.email}
                  src={mem?.photoURL}
                  sx={{}}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </div>

      <button
        onClick={handleChooseProject}
        className="reset right text-xs hover:bg-light-third dark:bg-dark-third p-2 rounded-md hover:brightness-125"
      >
        Chi tiết
      </button>
    </div>
  );
}

export default CardProject;
