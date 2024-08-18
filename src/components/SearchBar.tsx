import SearchIcon from '../../public/icon-search.svg';

function SearchBar() {
  return (
    <form className="relative max-w-[700px] mx-auto w-full">
      <SearchIcon className="absolute top-4 left-3" alt="검색 아이콘" />
      <input
        className="border border-primary rounded-md w-full placeholder:text-gray-2 pl-[42px] py-4 pr-14 focus:outline-none focus:shadow-md"
        placeholder="백준 번호 또는 이름으로 문제를 검색해 보세요."
      />
      <button className="text-primary absolute top-4 right-5">검색</button>
    </form>
  );
}

export default SearchBar;
