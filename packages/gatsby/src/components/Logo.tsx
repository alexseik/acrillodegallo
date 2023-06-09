import React from 'react';

const Logo = () => {
  return (
    <a href="/" className="flex w-full justify-center px-2 sm:p-1.5">
      <span className="sr-only">Asociación Cultural Rillo de Gallo</span>
      <img
        className="h-auto w-full max-w-xl object-cover"
        src="/assets/big-logo.jpeg"
        alt="Asociacion Cultural Rillo de Gallo"
      />
    </a>
  );
};

export default Logo;
