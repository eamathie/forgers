import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CategorySelector } from "./filtering/CategorySelector";

type DesktopFilterSortProps = {
  updateSelectedCategories: (value: string) => void;
  selectedCategories: string[];
  categories: string[];
  SortDropdowns: React.FC;
};

const DesktopFilterSort: React.FC<DesktopFilterSortProps> = ({ updateSelectedCategories, selectedCategories, categories, SortDropdowns }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <h2>Sort/filter:</h2>
        <IoMdArrowDropdown
          className={!isOpen ? "-rotate-90" : ""}
          size={22}
        />
      </div>

      {isOpen && (
        <div className="flex flex-row gap-10">
          <div className="w-1/4">
            <h2>Categories:</h2>
            <hr className="h-0.5 bg-gray-200" />
            <CategorySelector
              updateSelectedCategories={updateSelectedCategories}
              selectedCategories={selectedCategories}
              categories={categories}
            />
          </div>

          <div className="w-1/4">
            <h2>Sort:</h2>
            <hr className="h-0.5 bg-gray-200" />
            <SortDropdowns />
          </div>
        </div>
      )}
    </>
  );
};

export default DesktopFilterSort;