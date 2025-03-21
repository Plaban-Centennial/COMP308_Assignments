// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './Home.jsx';
// import Login from './Login.jsx';
// import Register from './Register.jsx';
// import Tournaments from './Tournaments.jsx';
// import AdminDashboard from './AdminDashboard.jsx';
// import CreateUser from './admin/CreateUser.jsx';
// import CreateTournament from './admin/CreateTournament.jsx';
// import AssignPlayers from './admin/AssignPlayers.jsx';
// import ListTournamentsAndPlayers from './admin/ListTournamentsAndPlayers.jsx';
// import ProtectedRoute from './ProtectedRoute.jsx';
// import Layout from './Layout.jsx'; // Import the Layout component

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/tournaments" element={<Tournaments />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute requiredRole="Admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/create-user"
//           element={
//             <ProtectedRoute requiredRole="Admin">
//               <CreateUser />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/create-tournament"
//           element={
//             <ProtectedRoute requiredRole="Admin">
//               <CreateTournament />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/assign-players"
//           element={
//             <ProtectedRoute requiredRole="Admin">
//               <AssignPlayers />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/list-tournaments"
//           element={
//             <ProtectedRoute requiredRole="Admin">
//               <ListTournamentsAndPlayers />
//             </ProtectedRoute>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;