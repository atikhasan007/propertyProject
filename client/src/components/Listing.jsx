import React from 'react';
import { categories } from '../assets/data';

const Listing = () => {
  return (
    <section id="listing" className="py-16 bg-gray-300 rounded-sm">
      {/* Title */}
      <div className="text-center pb-12">
        <h6 className="text-orange-500 capitalize font-serif font-semibold text-lg tracking-wide">
          From concept to reality
        </h6>
        <h2 className="text-4xl font-bold capitalize text-gray-800">
          Discover our newest listings
        </h2>
      </div>

      {/* Categories Container */}
      <div
        className="flex gap-x-4 bg-white ring-1 ring-gray-200 shadow-md 
                   rounded-full px-6 py-4 overflow-x-auto 
                   scrollbar-hide max-w-5xl mx-auto"
      >
        {categories.map((category) => (
          <div
            key={category.label}
            className="flex flex-col items-center gap-3 p-3 rounded-lg 
                       cursor-pointer min-w-[6rem] xl:min-w-[8rem] 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ flexShrink: 0 }}
          >
            <div
              className="text-secondary rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `${category.color}` }}
            >
              {category.icon}
            </div>
            <p className="text-sm font-medium text-gray-600">{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listing;
