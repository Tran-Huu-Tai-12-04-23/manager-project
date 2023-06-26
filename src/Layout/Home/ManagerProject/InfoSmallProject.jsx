import { useDispatch } from "react-redux";
import { projectDetailAction } from "../../../Store/projectDetailSlice";

function InfoSmallProject({ data }) {
  const dispatch = useDispatch();

  const handleChooseProject = () => {
    dispatch(projectDetailAction.initProjectDetail(data));
  };

  return (
    <div
      onClick={handleChooseProject}
      className="rounded-md border-1 text-sm mb-2 border-blur-light dark:border-blur-dark border-solid p-2 flex justify-between items-center relative font-family cursor-pointer hover:bg-light-second dark:hover:bg-dark-second"
    >
      {data.icon}
      <h5 className="mr-auto ml-2 text-xs capitalize">{data.name}</h5>
    </div>
  );
}

export default InfoSmallProject;
