import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

function WaitLoad({ type = "overview", data = [1, 2, 3, 4, 5, 6, 7] }) {
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255,255,255,0.1)"
  );
  const theme = useSelector((state) => state.reducer.theme);

  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        setBackgroundColor("rgba(255,255,255,0.1)");
      } else {
        setBackgroundColor("rgba(0,0,0,0.1)");
      }
    }
  }, [theme]);

  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      {/* <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", backgroundColor: "rgba(255,255,255,0.1)" }}
      /> */}
      {/* For other variants, adjust the size with `width` and `height` */}
      {type === "overview" && (
        <div className="grid grid-cols-5 mt-5 gap-5">
          {data.map((i, index) => {
            return (
              <Skeleton
                key={index}
                variant="rounded"
                width={"100%"}
                height={140}
                sx={{ backgroundColor: backgroundColor }}
              />
            );
          })}
        </div>
      )}
    </Stack>
  );
}

export default WaitLoad;
