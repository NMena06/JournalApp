import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"
import { ProfileView } from "../components/ProfileView"


export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <JournalPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
        <Route path="/profile" element={<ProfileView />} />
    </Routes>
  )
}
