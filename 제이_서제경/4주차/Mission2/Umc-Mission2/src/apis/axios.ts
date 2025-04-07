// 서버와 통신할 때 사용할 커스텀 axios 인스턴스를 만들고
// 매 요청마다 기본 URL과 헤더(토큰)를 자동으로 포함하도록 설정.

import axios from "axios"; // axios 라이브러리 import (HTTP 요청 보내는 도구)
import { LOCAL_STORAGE_KEY } from "../constants/key"; // 로컬스토리지 key 상수

// 커스텀 axios 인스턴스 생성 (기본 설정 포함)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // 기본 URL 설정: .env 파일에 저장된 서버 주소
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
    // 요청 헤더에 Authorization 토큰 자동 포함
    // "Bearer {accessToken}" 형태로 서버에 인증 정보 전달
  },
});
