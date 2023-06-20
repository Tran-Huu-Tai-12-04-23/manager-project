import { AvatarGroup, Avatar } from "@mui/material";
import { useEffect, useState } from "react";

function CardProject({ data }) {
  const [date, setDate] = useState(new Date(data.date_end));
  const [color, setColor] = useState("design");
  const [late, setLate] = useState(false);
  const [numberDay, setNumberDay] = useState(0);
  useEffect(() => {
    const timeDiff = Math.abs(date - new Date());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setNumberDay(daysDiff);
    if (daysDiff <= 1) {
      setColor("todo");
    }
    if (daysDiff <= 0) {
      setLate(true);
    }
  }, [date]);
  return (
    <div className="w-full h-fit dark:bg-dark-second bg-light-second p-2 rounded-md">
      <h5 className="font-family text-md capitalize">{data.title}</h5>
      <h5 className="font-family text-xs mt-2 mb-2 text-blur-light dark:text-blur-dark">
        Ngày hết hạn :
        <span className={`ml-2 text-${color}`}>
          {date.toLocaleDateString()}
        </span>
      </h5>

      {!late && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-${color}`}>
          Còn {numberDay} ngày nữa hết hạn
        </h5>
      )}
      {late && (
        <h5 className="font-family text-xs mt-2 mb-2 text-blur-light dark:text-blur-dark">
          Đã hết hạn
        </h5>
      )}

      <div className="w-full pl-2 mt-2">
        <AvatarGroup
          total={24}
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
          <Avatar alt="Remy Sharp" src="" sx={{}} />
          <Avatar alt="Travis Howard" src="" />
          <Avatar alt="Agnes Walker" src="" />
        </AvatarGroup>
      </div>

      <button className="reset right text-xs hover:bg-light-third dark:bg-dark-third p-2 rounded-md hover:brightness-125">
        Chi tiết
      </button>
    </div>
  );
}

export default CardProject;
