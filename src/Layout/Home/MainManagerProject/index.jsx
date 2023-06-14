import { v4 as uuid } from "uuid";
import Board from "./Board";
import { useSelector } from "react-redux";
import Note from "../Note";

function MainManagerProject({}) {
  const task = useSelector((state) => state.reducer.task);

  return (
    <div className="w-full bg-light-second dark:bg-dark-second">
      <Board tasksData={task}></Board>
      {/* <Note></Note> */}
    </div>
  );
}

export default MainManagerProject;
