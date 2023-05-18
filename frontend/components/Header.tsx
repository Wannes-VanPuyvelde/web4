// Header.tsx
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav>
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">
            Homepage
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default Header;
