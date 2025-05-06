// API 요청/응답에서 자주 반복되는 공통 타입들을 정의
// 페이지네이션 요청과 응답의 형식도 미리 타입으로 명시한 유틸리티 타입 파일

// 공통 응답 타입 : 모든 API 응답이 따르는 기본 구조
export type CommonResponse<T> = {
  status: boolean; // 요청 성공 여부 (true/false)
  statusCode: number; // HTTP 상태 코드 : 서버가 클라이언트의 요청에 어떻게 응답했는지
  message: string; // 응답 메시지
  data: T; // 실제 데이터 (제네릭 타입으로 유연하게 받음)
};

export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

// 커서 기반 페이지네이션 요청 시 사용할 파라미터 타입
export type PaginationDto = {
  cursor?: number; // 마지막으로 본 항목의 ID 또는 커서
  limit?: number; // 한 번에 가져올 데이터 수
  search?: string; // 검색어 필터링
  order?: string;
};
