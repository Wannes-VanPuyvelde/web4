import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Page from './page';
import Plants from '../pages/plants/Plants';
import AddPlant from '../pages/plants/AddPlant';
import EditPlant from '../pages/plants/EditPlant';
import DeletePlant from '../pages/plants/DeletePlant';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Page />} /> */}
        <Route path="/plants/*" element={<Plants />} />
        <Route path="/plants/add" element={<AddPlant />} />
        <Route path="/plants/edit/:id" element={<EditPlant />} />
        <Route path="/plants/delete/:id" element={<DeletePlant />} />
      </Routes>
    </Router>
  );
};

export default App;
