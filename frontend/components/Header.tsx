import React from 'react';
import Link from 'next/link';
import useUser from '../hooks/useUser'; // Import the useUser hook

const Header = () => {
  const { user } = useUser(); // Use the hook

  return (
    <nav>
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">
            Homepage
          </Link>
        </li>
        {user && (
          <>
            <li className="mr-4">
              <Link href="/plants">
                Plant Overview
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/plants/add">
                Add Plant
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/lights">
                Light Overview
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/lights/add">
                Add Light
              </Link>
            </li>
            <li className="mr-4">
          <Link href="/locations">
            Location Overview
          </Link>
        </li>
        <li className="mr-4">
          <Link href="/locations/add">
            Add Location
          </Link>
        </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
