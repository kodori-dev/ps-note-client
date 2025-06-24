import { Spinner } from "@chakra-ui/react";
import { PaginatedProblemSchema } from "../../../types/models/data-contracts";

interface Props {
  query: string;
  isLoading: boolean;
  isSuccess: boolean;
  handleListClick: (id: number, bojId: string, name: string) => void;
  data?: PaginatedProblemSchema;
  type?: "post" | "home";
}

const POSTION = {
  post: "top-[91px]",
  home: "top-16",
};

function SearchPreview({ query, isLoading, isSuccess, handleListClick, data, type = "post" }: Props) {
  return (
    <div className={["w-full absolute bg-white rounded-md shadow-xl p-4 z-modal", POSTION[type]].join(" ")}>
      <div className="h-[380px] flex flex-col items-center overflow-y-scroll">
        {isLoading ? (
          <Spinner color="blue.500" />
        ) : isSuccess && data && data.count > 0 ? (
          data.items.map(({ id, oj_id: bojId, name }) => (
            <div
              onClick={() => handleListClick(id, bojId, name)}
              key={id}
              className="w-full flex gap-5 border-b text-gray-1 border-gray-4 text-14 p-3 hover:bg-primary-background hover:text-black cursor-pointer"
            >
              <p className="w-20">
                {bojId.includes(query) ? (
                  <>
                    {bojId.slice(0, bojId.indexOf(query))}
                    <span className="text-primary">{bojId.slice(bojId.indexOf(query), bojId.indexOf(query) + query.length)}</span>
                    {bojId.slice(bojId.indexOf(query) + query.length)}
                  </>
                ) : (
                  bojId
                )}
              </p>
              <p className="truncate min-w-[223px]">
                {name.includes(query) ? (
                  <>
                    {name.slice(0, name.indexOf(query))}
                    <span className="text-primary">{name.slice(name.indexOf(query), name.indexOf(query) + query.length)}</span>
                    {name.slice(name.indexOf(query) + query.length)}
                  </>
                ) : (
                  name
                )}
              </p>
            </div>
          ))
        ) : (
          `검색 결과가 없습니다.`
        )}
      </div>
    </div>
  );
}

export default SearchPreview;
