# Typescript_blockchain

## 타입스크립트로 블록체인 만들기 

![image](https://user-images.githubusercontent.com/79817676/123149820-a600f780-d49c-11eb-94bf-cc62e38286d2.png)

## ✨상세설명
이전의 해시 값을 활용하여 자신의 해시값을 만들고, 이렇게 블록 하나하나 연결되어 체이닝을 이루고 이를 블록체인 이라 명명한다.
이를 한마디로 와닿게 말하면 "위변조 불가능한 신뢰의 기술" 이라 정리할수 있다. 이건 어원의 의미이고 블록체인 기술의 아주 일부분만 구현해 보았다.

## 폴더구조
![image](https://user-images.githubusercontent.com/79817676/123150884-d39a7080-d49d-11eb-955d-57ab725020e0.png)

src 폴더 안에있는 .ts 파일들을 .js로 번역하여 dist 폴더에 생성하는 구조이다.
$ tsc src/index.ts 를 수행하면 dist 안의 .js 는 자동으로 생성된다.
위와같은 명령을 수행하려면 tsconfig의 추가적인 설정이 필요하다.

## tsconfig
![image](https://user-images.githubusercontent.com/79817676/123151023-fdec2e00-d49d-11eb-9764-64943caa063f.png)

src 하위에 있는 모든 .ts 를 dist 폴더에 .js 로 번역하여 넣어준다.

## package.json
![image](https://user-images.githubusercontent.com/79817676/123151164-283deb80-d49e-11eb-94fe-3a92eb898d51.png)

그리고 start 스크립트를 ' "start": "tsc-watch --onSuccess \"node dist/index.js\"" '과 같이 작성한다.
tsc-watch 라이브러리는 타입스트립트의 코드변화를 감지하여 자동으로 tsc 명령을 실행해준다.
(현재 코드에서는 src/index.ts 의 수정사항을 감지하고 dist/index.js 와 index.js.map 를 새로 생성)
그 다음 dist/index.js 를 node 명령어로 실행한다.
이제 yarn start 로 해당 내용을 한번에 실행할수 있게 된다.

## 라이브러리
- typescript : 타입스크립트를 작성하기 위함
- tsc-watch : 타입스트립트의 코드변화를 감지하여 자동으로 tsc 실행
- crypto-js : Hash 값을 암호화 하기위함




