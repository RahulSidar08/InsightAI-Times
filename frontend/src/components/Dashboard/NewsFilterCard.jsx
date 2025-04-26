import React, { useEffect, useState } from "react";
const NewsFilterCard = ({onSelectCategory}) => {
  const [filters, setFilters] = useState({
    categories: ["Politics", "Technology", "Sports", "Entertainment"],
    sources: ["BBC", "CNN", "Al Jazeera", "NDTV"],
    dates: ["Today", "This Week", "This Month"],
  });

  const onFilterChange = (type, value) => {
    console.log(`Selected ${type}:`, value);
    onSelectCategory(value)
    // Apply filter logic here
  };
  return (
    <div className="border rounded-2xl p-6 w-72 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter News</h2>
      <hr className="mb-4" />

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Category</h4>
        {filters.categories.map((category) => (
          <label key={category} className="flex items-center mb-2 text-sm">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Source Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Source</h4>
        {filters.sources.map((source) => (
          <label key={source} className="flex items-center mb-2 text-sm">
            <input
              type="radio"
              name="source"
              value={source}
              onChange={(e) => onFilterChange("source", e.target.value)}
              className="mr-2"
            />
            {source}
          </label>
        ))}
      </div>

      {/* Date Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Date</h4>
        {filters.dates.map((date) => (
          <label key={date} className="flex items-center mb-2 text-sm">
            <input
              type="radio"
              name="date"
              value={date}
              onChange={(e) => onFilterChange("date", e.target.value)}
              className="mr-2"
            />
            {date}
          </label>
        ))}
      </div>
    </div>
  );
};

export default NewsFilterCard;
