import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";


const drawerWithd = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWithd={drawerWithd}/>

      <SideBar drawerWithd={drawerWithd}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
};
