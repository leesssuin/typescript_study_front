## **✏️ 토이 프로젝트 목적**


- 타입스크립트를 책으로 공부하면서 직접 코드로 구현을 해봐야 완벽하게 이해할 수 있을것 같아 시작한 토이 프로젝트입니다.
- 데이터의 타입뿐만 아니라 react node, hooks, event handler등을 사용함으로써 상황에 따른 타입 설정에 대해 직접 적용해볼 수 있도록 프로젝트 방향을  설정했습니다.
- 평소 체크리스트를 어떻게하면 더 효율적으로 사용할 수 있을지에 대한 고민을 가지고 있었는데 여러개의 체크리스트를 직접 구현함으로써 공부해보려고 합니다.
<br>
<br>

## **📆 토이 프로젝트 기간**


- 2024.04.08 ~ 2024.04.19
<br>
<br>

## **🗓️ 프로젝트 관리**


https://github.com/users/leesssuin/projects/2
<br>
<br>


## **💻 개발환경**


- node v21.6.1
- npm v10.2.4
<br>
<br>

## **🛠️ 설치 및 실행방법**

### **Client**

```
git clone https://github.com/leesssuin/typescript_study_front.git
npm install
npm start
```

### **Server**

```
git clone https://github.com/leesssuin/typescript_study_server.git
npm install
npm run dev
```
<br>
<br>

## **🔐 환경 변수 설정**
폴더 최상단에 .env 파일을 생성한 후 아래의 정보를 넣어주세요.

### **Client**
```
REACT_APP_SERVER_URL=http://localhost:8000
```

### **Server**
```
DB=<YOUR_MONGODB_URL>
```
<br>
<br>

## **⚙️ 기술 스택**
### **Client**
- React
- Typescript
- styled-components
- recoil
### **Server**
- Node.js
- Express
- MongoDB
<br>
<br>

## **🚀 구현 기능**

### 1. 가게 리스트 및 메뉴 리스트

<img src="https://velog.velcdn.com/images/leesssuin/post/1099898c-8dd8-425a-bd60-231d9b703130/image.gif" style="width: 180px" />
<br>

- 가게를 클릭하면 해당 가게 메뉴 리스트로 이동
- 메뉴 클릭하면 메뉴의 옵션 선택 리스트로 이동

### 2. 옵션 리스트

<img src="https://velog.velcdn.com/images/leesssuin/post/ed984295-50ee-4f04-b081-5dfcf2830c85/image.gif" style="width: 180px" />
<br>

- 필수 선택 갯수 유효성 검사 기능으로 갯수가 부족할 경우 다음 페이지로 넘어가지 않음<br>
- 필수 선택과 추가 선택이 연동되어 있어 어디서 체크되었는지 표시되고 체크 기능은 disabled 처리 <br>

### 3. 바텀 시트

<img src="https://velog.velcdn.com/images/leesssuin/post/4aded344-10fc-49b1-b4d4-f38d3206a08a/image.gif" style="width: 180px" />
<br>

- 옵션 선택시 바텀시트에 추가
- 바텀시트내 카테고리를 누르면 그 자리로 scroll 이동
- 처음 옵션 선택 시 닫혀있던 바텀시트 오픈
- 바텀시트를 닫고서도 체크항목 추가 가능
- 선택 옵션이 없을땐 빈 +박스, 옵션이 있을땐 선택항목의 이름의 박스가 보임
- 필수 선택과 추가 선택의 색상 다르게 표현
- 필수선택 갯수 충족시 완료버튼 활성화

### 4. 토스트 기능

<img src="https://velog.velcdn.com/images/leesssuin/post/b86fb97a-ae4f-489a-abe5-c00b4f00812b/image.gif" style="width: 180px" />
<br>

- 필수 선택 갯수가 부족한 경우 토스트 알림

### 5. 최종금액 페이지


<img src="https://velog.velcdn.com/images/leesssuin/post/c24ec21b-02f9-4bfd-bcf3-bb3601ba341e/image.gif" style="width: 180px" />
<br>

- 완료 버튼 클릭시 총 금액 확인할 수 있는 페이지로 이동
- 체크리스트로 돌아갔다가 와도 선택한 옵션 유지

## **☝🏻 앞으로의 과제**


- 프론트엔드 코드에서 camel case를 사용하지만 서버에서 보내주는 데이터는 snake case여서 변환하여 좀 더 깔끔하게 코드 유지 
- 테스트 코드를 작성하며 테스트 코드에 관한 공부도 이어서 해보기
- 체크리스트를 관리하는 다른 방법도 찾아서 리팩토링 해보기
<br>
<br>