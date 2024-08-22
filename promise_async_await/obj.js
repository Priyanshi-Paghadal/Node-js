fetch('https://fakestoreapi.com/products/category/jewelery?limit=1')
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Something Went Wrong..."))

// ASYNC AND AWAIT WITH TRY AND CATCH

async function asyncFun() {
    try {
        let res = await fetch('https://fakestoreapi.com/products/category/jewelery?limit=1');
        let data = await res.json();
        console.log(data);
    }
    catch (err) {
        console.log("Something Went Wrong...")
    }
}
asyncFun();