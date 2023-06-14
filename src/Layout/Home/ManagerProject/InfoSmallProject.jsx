import MoreVertIcon from "@mui/icons-material/MoreVert";

function InfoSmallProject({ data }) {
  return (
    <div className="rounded-md border-1 text-sm mb-2 border-blur-light dark:border-blur-dark border-solid p-2 flex justify-between items-center relative font-family cursor-pointer hover:bg-light-second dark:hover:bg-dark-second">
      {data.icon}
      <h5 className="mr-auto ml-2 text-xs">{data.name}</h5>
      <MoreVertIcon
        style={{
          width: "20",
          height: "20",
        }}
      ></MoreVertIcon>
    </div>
  );
}

export default InfoSmallProject;
