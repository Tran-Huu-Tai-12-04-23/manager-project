import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubNavigate({ activeTab, setActiveTab, tabs }) {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", color: "inherit" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", color: "inherit" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          sx={{ color: "inherit" }}
          aria-label="basic tabs example"
        >
          {tabs.map((t, index) => {
            return (
              <Tab
                key={index}
                label={t.name}
                {...a11yProps(index)}
                sx={{ color: "inherit", minWidth: "6rem", fontSize: ".725rem" }}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
}
