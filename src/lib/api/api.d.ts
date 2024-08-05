type ApiResponse ={
    name:string;
    age:number;
    posts:Post[]
}


type Post = {
    id:string;
    date:Date;
    content:"HELLO" | "KAVYA" | "BHARAT"
}