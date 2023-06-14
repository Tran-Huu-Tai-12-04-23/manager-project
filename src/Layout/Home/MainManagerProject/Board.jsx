import BoardTask from "./BoardTask";
import NavBarBoard from "./SubNavTaskCol";

function Board({ tasksData }) {
  return (
    <div className="w-full h-full ">
      <BoardTask tasksData={tasksData}></BoardTask>
    </div>
  );
}

export default Board;
