import { v4 as uuid } from "uuid";
import Board from "./Board";
import { useSelector } from "react-redux";
import Note from "../Note";

function MainManagerProject({ activeTab }) {
  return (
    <div className="w-full bg-light-second dark:bg-dark-second">
      {activeTab === 0 && <Board></Board>}

      {activeTab === 1 && <Note></Note>}
    </div>
  );
}

export default MainManagerProject;
