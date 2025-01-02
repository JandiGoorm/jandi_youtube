## 프로젝트 실행

#### 1. 의존성을 설치합니다.

```
npm install
```

#### 2. 프로젝트를 실행합니다.

```
npm run dev
```

#### 3. 빌드 방법

```
npm run build
```

## 폴더 구조

```
├── src
│   ├── apis            // 외부 서버와 통신에 필요한 파일 모음
│   ├── assets          // 에셋 파일 모음
│   ├── components      // 전역적으로 사용되는 리액트 컴포넌트 파일 모음
│   ├── constants       // 상수, enum 등 전역적으로 사용되는 변수 모음
│   ├── layouts         // 레이아웃 모음
│   ├── pages           // 페이지 진입점 컴포넌트 (해당 페이지에서만 사용하는 컴포넌트는 페이지 폴더안에 생성)
│   ├── App.jsx         // 루트 컴포넌트
│   └── main.jsx        // 리액트 진입점
├── .gitignore          // git 버전 관리에서 제외할 파일 목록
├── .prettierrc         // 코드 포매터인 prettier의 설정 파일
├── eslint.config.js    // 코드 linter인 eslint의 설정 파일
├── index.html          // SPA 진입점인 html 파일
├── package-lock.json   // 정확한 버전을 유지하기 위해 gitignore에 추가하지 않습니다.
├── package.json        // 버전 관리 파일
└── vite.config.js      // vite 설정 파일
```

## 컨벤션

#### 파일, 폴더명

- 리액트 컴포넌트는 PascalCase로 작성합니다. (폴더명 파일명 동일)
- 그 외 나머지 파일명은 camelCase로 작성합니다. (폴더명 파일명 동일)
- 컴포넌트 함수는 PascalCase로 작성합니다.

```
const Homepage = () => {}
```

- 그 외 변수, 함수명은 camelCase로 작성합니다.

```
const toNumber = () => {}
```

- 상수, enum은 대문자 + snake_case로 작성합니다.

```
const ZERO = 0
```

#### 환경변수

- 환경 변수는 .env 파일에 VITE\_ 접두사를 붙여 만들어 주시면 됩니다.

```
VITE_YOUTUBE_API_KEY="????"
```

- 짧은 변수명을 위해 constants/config.js 에서 불러와 export 하는 식으로 사용합니다.

```
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
```

#### 커밋 메시지 구조

```
1. 제목과 본문을 빈 행으로 구분할 것
2. 제목은 50글자 이내로 제한할 것
3. 제목의 첫 글자는 대문자로 작성할 것
4. 제목 끝에 마침표를 넣지 않을 것
5. 제목은 명령문으로 작성하되 과거형을 사용하지 않을 것
6. 본문의 각 행은 72글자 내로 제한할 것
7. 어떻게 보다는 무엇과 왜를 설명할 것

//Header, Body, Footer는 빈 행으로 구분한다.
타입(스코프): 주제(제목) //Header

본문 //Body

바닥글 //Footer

- Header는 필수이며 스코프는 생략 가능
- Body에서는 Header에서 표현할 수 없는 상세한 내용을 적을 것
    - 생략 가능
- Footer는 어떤 이슈에서 왔는지 같은 참조 정보들을 추가하는 용도로 사용
    - e.g. issues#1234
    - 생략 가능

- 타입은 해당 커밋의 성격을 나타내며 아래 중 하나여야 함
```

#### 커밋 타입

| 키워드   | 설명                                                  |
| -------- | ----------------------------------------------------- |
| feat     | 새로운 기능에 대한 커밋                               |
| fix      | 버그 수정에 대한 커밋                                 |
| build    | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| chore    | 그 외 자잘한 수정에 대한 커밋                         |
| ci       | ci 관련 설정 수정에 대한 커밋                         |
| docs     | 문서 수정에 대한 커밋                                 |
| style    | 코드 스타일 혹은 포맷 등에 관한 커밋                  |
| refactor | 코드 리팩토링에 대한 커밋                             |
| test     | 테스트 코드 수정에 대한 커밋                          |
| perf     | 성능 개선에 대한 커밋                                 |
