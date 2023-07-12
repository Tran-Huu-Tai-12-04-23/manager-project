import Board from "./Board";
import Note from "../Note";

function MainManagerProject({ activeTab }) {
  return (
    <div className="w-full bg-light-second dark:bg-dark-second"
      style={{
        height: 'calc(100% - 12rem)',
      }}
    >
      {activeTab === 0 && <Board></Board>}

      {activeTab === 1 && <Note></Note>}
    </div>
  );
}

export default MainManagerProject;
