import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import  PlantOverviewTable  from '../components/plants/PlantOverviewTable';

function App() {
    return (
        <>
            <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
                <a
                    className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none"
                    href="/"
                >
                    UCLL Plants
                </a>
                <nav>
                    <ul className="nav justify-content-center">
                        <li>
                            <Link to="/plants" className="nav-link px-4 fs-5 text-white">
                                Plants
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container mt-5">
                <Routes>
                    <Route path="/plants" element={<PlantOverviewTable  />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
