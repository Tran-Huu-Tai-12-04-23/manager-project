import { useCallback, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../../Store/themeSlice";
import Register from "./Register";
import Login from "./Login";

const Sign = () => {
  const [activeLogin, setActiveLogin] = useState(true);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.reducer.theme);

  const handleThemeSwitch = () => {
    dispatch(themeAction.switchTheme(theme == "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen dark:text-white text-black overflow-hidden">
      {activeLogin && (
        <Login
          theme={theme}
          handleThemeSwitch={handleThemeSwitch}
          setActiveLogin={setActiveLogin}
        ></Login>
      )}
      {!activeLogin && (
        <Register
          theme={theme}
          handleThemeSwitch={handleThemeSwitch}
          setActiveLogin={setActiveLogin}
        ></Register>
      )}
    </div>
  );
};
export default memo(Sign);
