'use client'

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Plants from '../pages/plants/Plants';
import AddPlant from '../pages/plants/AddPlant';
import EditPlant from '../pages/plants/EditPlant';
import DeletePlant from '../pages/plants/DeletePlant';

const WelcomePage = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/plants">Plants</Link></li>
            <li><Link to="/plants/add">Add Plant</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to the Plant Manager</h1>
      </main>
    </div>
  );
};

const Page = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/plants/*" element={<Plants />} />
        <Route path="/plants/add" element={<AddPlant />} />
        <Route path="/plants/edit/:id" element={<EditPlant />} />
        <Route path="/plants/delete/:id" element={<DeletePlant />} />
      </Routes>
    </Router>
  );
};

export default Page;
