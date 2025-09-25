"use client";

import { FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchPreview from "./SearchPreview";
import { useDebouncingSearch } from "@/hooks/useDebouncingSearch";
import { Input, InputGroup } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

interface Props {
  initialValue?: string;
}

function SearchBar({ initialValue }: Props) {
  const { register, getValues, setValue, watch } = useForm();
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const { searchBar } = getValues();
    window.location.href = `/search?keyword=${searchBar}&page=1`;
  };
  const { searchBar } = watch();
  const { isLoading, isSuccess, data, isOpen, setIsOpen } = useDebouncingSearch(searchBar, searchBar && searchBar !== initialValue);

  useEffect(() => {
    if (initialValue) setValue("searchBar", initialValue);
  }, []);

  const handleListClick = (id: number, bojId: string, name: string) => {
    setIsOpen(false);
    window.location.href = `/problem/${id}`;
  };

  return (
    <form className="relative max-w-[700px] mx-auto w-full" onSubmit={handleSearchSubmit}>
      <InputGroup width={"full"} flex="1" startElement={<IoSearch size={18} color="#3b82f6" aria-label="검색 아이콘" />}>
        <Input {...register("searchBar")} css={{ "--focus-color": "colors.blue.500" }} variant={"flushed"} placeholder="문제 번호 또는 이름으로 문제를 검색해 보세요." />
      </InputGroup>
      {isOpen && <SearchPreview type="home" query={searchBar} handleListClick={handleListClick} isLoading={isLoading} isSuccess={isSuccess} data={data} />}
    </form>
  );
}

export default SearchBar;
