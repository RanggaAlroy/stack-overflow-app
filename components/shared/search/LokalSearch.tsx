'use client';
import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

// we need to use this Lokal search component for other pages as well
// so we need to make it reusable by passing props and interface

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string; // '?' stand for 'optional'
}

const LokalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] flex-1 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="search_icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        placeholder={placeholder}
        onClick={() => {}}
        className="paragraph-regular no-focus placeholder w-full border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          alt="search_icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LokalSearch;
