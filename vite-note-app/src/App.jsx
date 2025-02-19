import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/mainLayout";  // ✅ Fixed component name
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/addNotepage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="add-note" element={<AddNotePage />} />
      <Route path="edit/:task_id" element={<EditNotePage />} />
      <Route path="note/:task_id" element={<NoteDetailPage />} />
    </Route>
  ),
  
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
