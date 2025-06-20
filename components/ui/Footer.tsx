import React from 'react';

const Footer = () => {
  return (
    <div>
       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <a className="hover:underline" href="/about">About Us</a>
        <a className="hover:underline" href="/blog">Blog</a>
        <a className="hover:underline" href="/terms">Terms & Conditions</a>
      </footer>
    </div>
  );
}

export default Footer;
