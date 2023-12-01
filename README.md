# Notion Issue Tracker CLI

## 설치

```shell
npm install -g @testbank-inc/nit-cli
```

## 설정

```shell
nit auth --key ************** --dbid ***********
```

```shell
nit auth --userName 김지훈
```

이름을 설정하면 노션 DB 에 접근 가능한 유저들 중에 같은 이름을 가진 유저를 찾고 notion user id 할당.
없으면 설정이 안됩니다.

## 사용

```shell
nit issue start
? Select a issue › 
    SLV-581 | 웹뷰 플러그인 v2 (2) | To Do | 김지훈
    SLV-566 | [APP] 마케팅 정보 수신 동의 (채널별) | To Do | 허백
    SLV-599 | [BE] banner type, url 추가 | To Do | 이지훈
❯   SLV-598 | [IDL] banner type, url 추가 | To Do | 이지훈
    SLV-563 | [APP] D-day 커스터마이징 | 기획 중 | 허백
    SLV-565 | [APP] 팝업 모듈 (웹뷰 모달 C타입) | 기획 중 | 안지현
    SLV-544 | [APP] 서비스 전역 아이콘 디자인 개편 | 디자인 중 | 이지수
```

선택하면
로컬 dev 로 checkout -> 이슈번호로 브랜치 생성 및 checkout -> 리모트 origin 에 도 이슈번호 브랜치 push -> `gt repo init --truck {이슈번호브랜치}` -> 노션
이슈 상태 In Progress (개발 중) 로 변경하고 담당자 (Assignee) 변경

## Shortcut

`nit issue start` = `nit i s`



