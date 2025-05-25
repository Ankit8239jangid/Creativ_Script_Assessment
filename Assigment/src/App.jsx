import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./Context/Auth/ProtectedRout";
import UserManagementTable from "./Page/UserManagementTable/User_Page";


// Lazy-loaded pages
const LoginPage = lazy(() => import("./Page/LoginPage/LoginPage"));
const Dashboard = lazy(() => import("./Page/Dashboard_Page/Dashboard"));
const Layout = lazy(() => import("./Page/Layout/Layout"));

const ConnectionsTable = lazy(() => import("./Page/ConnectionsPage/ConnectionsTable"));
const Institutions = lazy(() => import("./Page/Institutions_Page/Institutions"));
const Profile = lazy(() => import("./Page/ProfilePage/Profile"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Users" element={<UserManagementTable />} />
            <Route path="Connections" element={<ConnectionsTable />} />
            <Route path="Institutions" element={<Institutions />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
