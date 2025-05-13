import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import Portal from "../components/portal/portal";
import { useLocation } from "react-router-dom";
import { Lp } from "../types/lp";
import { Search } from "lucide-react";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay.ts";
import useDebounce from "../hooks/queries/useDebounce.ts";

function HomePage() {
  const location = useLocation();
  const [search] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const {
    data: lps,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.asc);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (location.state?.showSearch) {
      setShowSearch(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 검색어가 있을 때 LP 목록을 필터링 (id로만 비교)
  const filteredLps = lps?.pages
    ?.map((page: { data: { data: Lp[] } }) => page.data.data)
    ?.flat()
    ?.filter((lp) => searchQuery === "" || String(lp.id) === searchQuery);

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1100px]">
      {showSearch && (
        <div className="mb-6 w-1/2">
          <div className="relative flex items-center">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="text-gray-400" size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="pl-9 flex-1 py-2 px-2 text-sm rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-0 focus:border-gray-700"
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {(showSearch
          ? filteredLps
          : lps?.pages
              ?.map((page: { data: { data: Lp[] } }) => page.data.data)
              ?.flat()
        )?.map((lp: Lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-pink-500 text-white text-4xl shadow-lg z-50 flex items-center justify-center leading-none"
      >
        <span className="relative bottom-0.5">+</span>
      </button>

      {isModalOpen && (
        <Portal>
          <div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-[#26282c] rounded-2xl p-8 relative w-[370px] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-200 text-2xl hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <img
                src={previewImg || "/default-img.png"}
                alt="LP"
                className="w-36 h-36 rounded-full object-cover cursor-pointer mb-6 border-4 border-[#5A6170] bg-[#23262F]"
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreviewImg(URL.createObjectURL(file));
                }}
              />
              <input
                className="w-full mb-3 p-3 rounded-lg bg-[#5A6170] text-white placeholder-gray-300"
                placeholder="LP Name"
              />
              <input
                className="w-full mb-3 p-3 rounded-lg bg-[#5A6170] text-white placeholder-gray-300"
                placeholder="LP Content"
              />
              <div className="flex w-full mb-2 gap-x-2">
                <input
                  className="flex-1 p-3 rounded-lg bg-[#5A6170] text-white placeholder-gray-300 border-none focus:ring-2 focus:ring-pink-400 w-2/3"
                  placeholder="LP Tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTag();
                  }}
                />
                <button
                  className="px-4 rounded-lg bg-[#7B8190] text-white font-semibold hover:bg-pink-500 transition w-auto"
                  onClick={handleAddTag}
                  type="button"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 w-full mb-5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-[#23262F] text-white px-3 py-1 rounded-lg text-m"
                  >
                    {tag}
                    <button
                      className="ml-2 text-gray-300 hover:text-white"
                      onClick={() => handleRemoveTag(tag)}
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-[#C0C6D6] transition">
                Add LP
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default HomePage;
