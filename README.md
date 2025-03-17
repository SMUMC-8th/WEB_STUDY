# 🌟 WEB_STUDY

웹 개발을 공부하는 저장소입니다! 🚀  

## 🔥 Git Commit Convention (커밋 규칙)  
효율적인 협업을 위해 다음과 같은 커밋 메시지 규칙을 사용합니다.  

| 커밋 타입 | 설명 |
|-----------|------------------------------------------------|
| 🎉 `FEAT` | 새로운 기능 추가 |
| 🐛 `FIX` | 버그 및 오류 수정 |
| 🛠 `CHORE` | 코드 수정, 내부 파일 수정 |
| 📝 `DOCS` | 문서 수정 (README 등) |
| 🔄 `REFACTOR` | 코드 리팩토링 (기능 변경 없음) |
| 🧪 `TEST` | 테스트 코드 추가 및 수정 |

💡 **예시:**  
```bash
git commit -m "FEAT: 회원가입 기능 추가"
git commit -m "FIX: 로그인 버그 수정"
```

## 🚀 GitHub 미션 제출 가이드
본인의 닉네임/이름에 해당하는 브랜치에서 작업합니다.
폴더 구조는 아래와 같이 맞춰 주세요!

### 📂 폴더 구조
```
📦 WEB_STUDY
 ┣ 📂 코튼_김연진  
 ┃ ┣ 📂 1주차_미션  
 ┃ ┃ ┣ 📂 미션1
 ┃ ┃ ┣ 📂 미션2  
 ┃ ┃ ┗ ...  
 ┗ ...
 ```
### 🛠 Git 사용 방법

📌 1. 저장소 클론하기
```
git clone https://github.com/SMUMC-8th/WEB_STUDY.git
cd WEB_STUDY
```
📌 2. 본인 브랜치로 이동 
(git branch -a로 branch 명을 조회할 수 있습니다!)
```
git branch -a 
git checkout 닉네임/이름
```
📌 3. 미션 폴더 생성 & 코드 작성
```
mkdir -p 닉네임_이름/n주차_미션/미션1
```
📌 4. 변경 사항 저장 & 푸시
```
git add .
git commit -m "FEAT: n주차 미션1 완료"
git push origin 닉네임/이름
```
📌 5. GitHub에서 PR(Pull Request) 요청

GitHub에서 본인 브랜치 → main 브랜치로 PR을 생성하고, 팀원들에게 코드 리뷰 요청하세요! ✨
