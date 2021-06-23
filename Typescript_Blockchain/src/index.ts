import * as CryptoJS from "crypto-js";

class Block{
    // 새로운 Block이 생성될때 자신의 Hash 값을 생성
    static calculateBlockHash = (
        index:number,
        perviousHash:string,
        timestamp:number,
        data:string
        ) :string =>
        CryptoJS.SHA256(index + perviousHash + timestamp + data).toString();

    // 생성된 Block이 유효한 데이터 구조인지 체크 
    static validateStructure = (aBlock: Block) : boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        perviousHash: string,
        data: string,
        timestamp: number,
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = perviousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

// Default 블록 생성 
const genesisBlock:Block = new Block(0, "2020202020202", "", "Hello", 123456);

// 전체 블록들을 담을 배열 
let blockchain: Block[] = [genesisBlock];

// 현재 생성된 블록들을 가져오는 함수
const getBlockchain = () : Block[] => blockchain;

// 현재 블록들 중에 가장 최근에 생성된 블록 가져오는 함수
const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

// 새로운 블록 생성시간 만들기 함수
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 블록체인을 생성하는 함수
// - Block 클래스의 내장 함수인 calculateBlockHash를 사용하여 새로운 블록을 생성할 수 있게 Param을 전달한다. 
// - 생성된 Block을 기존 블록들을 담는 List에 Push
const createNewBlock = (data:string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
        );
    const newBlock : Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
        );
        addBlock(newBlock);
        return newBlock;
};

// 생성된 블록을 받아 해쉬를 생성
const getHashforBlock = (aBlock: Block) :string => Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
    );

// 유효한 블록인지 확인하는 함수 추가
const isBlockValid = (
    candidateBlock: Block,
    previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }else{
        return true;
    }
};

//  유효성 검사 결과가 True일 경우 block 리스트에 추가, 현재의 블록체인 구조에 newBlock을 추가 
const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};