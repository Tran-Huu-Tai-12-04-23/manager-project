import { AvatarGroup, Avatar } from "@mui/material";

function CardProject({ data }) {
  return (
    <div className="w-full h-fit dark:bg-dark-second bg-light-second p-2 rounded-xl">
      <div
        className={`flex justify-start items-center bg-${data.priority} w-fit pl-4 pr-4 pt-1 rounded-md pb-1`}
      >
        <div className={`p-1 h-2 rounded-full mr-2  bg-${data.priority}`}></div>
        <h5 className="font-family text-xs"> {data.priority}</h5>
      </div>
      <h5 className="font-family text-xs mt-2">{data.name}</h5>
      <div className="justify-between flex items-center w-full">
        <div className="flex w-full mt-2 rounded-xl bg-light-third dark:bg-dark-third overflow-hidden mr-2">
          <div
            className="h-2  bg-primary rounded-xl"
            style={{
              width: "13%",
            }}
          ></div>
        </div>
      </div>
      <div className="w-fit mt-2 text-blur-light text-xs dark:text-blur-dark">
        Hoàn thành 13 %
      </div>
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
