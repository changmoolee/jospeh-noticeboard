# my-pet-community

url : https://my-pet-community.netlify.app


## Tech Stack
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/></a><br><br>

## 개요

#### my-pet-community는 반려동물을 주제로 자유롭게 소통할 수 있는 게시판 웹페이지 입니다. 게시판에 글을 남기고 자유롭게 소통하세요!
#### 자체 제작한 ui-kit인, `joseph-ui-kit` 패키지의 UI들을 활용하여 사이트를 구성했습니다.
#### firebase의 다양한 기능들을 사용하여 제작하였습니다.
<br><br>

## 기능

### :heavy_plus_sign: 유저 관련 기능

#### firebase의 인증(Authentication)서비스를 활용하여 회원가입, 탈퇴를 구현했습니다.
Authentication 서비스는 사용자 인증에 필요한 기능들을 제공해 주어 손쉽게 구현할 수 있었습니다.  
<br>

#### 로그인

<img alt="로그인" src="https://user-images.githubusercontent.com/84559872/188130517-cf9010da-374a-4f25-b9c9-a7b10cab8999.png" width="30%" />

#### 회원가입

<img alt="회원가입" src="https://user-images.githubusercontent.com/84559872/188130726-23973ef6-e2b4-4685-900c-a76ac79c2587.png" width="30%" />

#### 탈퇴

<img alt="탈퇴" src="https://user-images.githubusercontent.com/84559872/188130911-f4e462fa-be13-4e06-93c2-40a3c431aa68.png" width="30%" />

<br><br>

### :heavy_plus_sign: 게시판 관련 기능

#### firebase의 Cloud Firestore를 활용하여 게시판 게시물의 create 기능을 구현했습니다.
Cloud Firestore 서비스는 NoSQL 클라우드 데이터베이스로써 클라이언트 및 서버 측 개발에 사용되는 데이터를 저장하고 동기화할 수 있습니다.
게시물을 제목, 내용 등을 포함한 객체형 데이터로 저장하고 동기화 하였습니다.

#### 현재 create 작성 기능만 구현되어 있으며, 추후 수정(update),삭제(delete) 기능도 도입할 예정입니다.

<br>

#### 게시판 글 쓰기

<img alt="탈퇴" src="https://user-images.githubusercontent.com/84559872/188132073-478348c1-16f4-4999-9ec1-36a5b29c9f94.png" width="30%" />

#### 게시판에 글이 등록된 모습

<img alt="탈퇴" src="https://user-images.githubusercontent.com/84559872/188132532-d2dd907f-bba8-4985-bca1-3507385df434.png" width="30%" />

<br><br>

### :heavy_plus_sign: 이미지 업로드 기능

#### firebase의 Cloud Storage를 활용하여 이미지 업로드를 구현했습니다.
게시물을 작성하면서 업로드된 이미지 파일 및 프로필 수정시 업로드된 이미지 파일들을 Cloud Storage에 저장시키고 웹사이트에 구현되도록 하였습니다.

#### 프로필 이미지 업로드

<img alt="로그인" src="https://user-images.githubusercontent.com/84559872/188132684-2c8fa884-ebf4-4231-a9ec-5fb0416c5f8c.png" width="30%" />

#### 게시판 이미지 업로드

<img alt="로그인" src="https://user-images.githubusercontent.com/84559872/188133355-75d42774-41db-4499-9b40-5402b320b8da.png" width="30%" />


<br><br>
