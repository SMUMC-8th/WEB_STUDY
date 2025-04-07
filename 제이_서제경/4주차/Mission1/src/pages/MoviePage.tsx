import MovieCard from "../components/moivieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie";

// 하나의 영화 페이지를 카테고리 별로 보여주는 컴포넌트
export default function MoviePage() {
  // 현재 페이지 번호 상태 (기본값: 1)
  const [page, setPage] = useState(1);

  // URL에서 category 값을 가져와서 API에 사용
  const { category } = useParams<{
    category: string;
  }>();

  // 카테고리가 바뀔 때 page를 1로 초기화 (피드백 반영)
  useEffect(() => {
    setPage(1);
  }, [category]);

  // API 요청 URL 생성 (카테고리 + 페이지 반영)
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  // 커스텀 훅으로 영화 데이터 불러오기
  const {
    data: movies, // 응답 데이터
    isPending, // 로딩 중 여부
    isError, // 에러 발생 여부
  } = useCustomFetch<MovieResponse>(url);

  // 에러 처리 : 커스텀 훅 useCustomFetch에서 isError가 true이면!
  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  // 메인 화면 렌더링 시작~
  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-6">
        {/* 이전 버튼 */}
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200
    transition disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={page === 1} // 현재 페이지가 1일 땐 비활성화
          onClick={() => setPage((prev) => prev - 1)} // 페이지 감소
        >
          <ChevronLeft className="w-4 h-4" /> {/* 왼쪽 화살표 아이콘 */}
        </button>

        {/* 현재 페이지 숫자 */}
        <span className="text-sm text-gray-500 tracking-wide">
          {page} 페이지
        </span>

        {/* 다음 버튼 */}
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200
    transition"
          onClick={() => setPage((prev) => prev + 1)} // 페이지 증가
        >
          <ChevronRight className="w-4 h-4" /> {/* 오른쪽 화살표 아이콘 */}
        </button>
      </div>

      {/* 로딩 중일 때 스피너 보여주기 : useCustomFetch에서 데이터 요청 중일 때 isPending이 true! */}
      {isPending && (
        <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
          <LoadingSpinner />
        </div>
      )}

      {/* 로딩 완료 후 영화 카드 목록 보여주기*/}
      {!isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
          {movies?.results.map(
            (
              movie // movies.results 배열을 순회하며 카드를 렌더링
            ) => (
              <MovieCard key={movie.id} movie={movie} />
            )
          )}
        </div>
      )}
    </>
  );
}
