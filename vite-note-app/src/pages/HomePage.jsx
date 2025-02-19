import React from "react";
import { useOutletContext } from "react-router-dom";
import Filter from "../components/filter/filter";
import PriorityFilter from "../components/priortyFilter/priorityFilter";
import NoteCardContainer from "../components/cardContainer/cardContainer";

const HomePage = () => {
  const { tasks, loading, searchTerm, selectedCategory, setSelectedCategory, selectedPriority, setSelectedPriority } = useOutletContext(); // ✅ Get context

  // ✅ Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PriorityFilter onFilterChange={setSelectedPriority} />
      <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {loading ? <div>Loading...</div> : <NoteCardContainer tasks={filteredTasks} />}
    </>
  );
};

export default HomePage;
