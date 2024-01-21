hello = async() => {
   console.log("Hello World")
   // return "Hello World!";
 } 

console.log("Before")
hello()
console.log("After")

add = async(a,b) => {
   await hello()
   return a+b;
}

console.log(add(5,6))
