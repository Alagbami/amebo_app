// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LekTech IT Group All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
