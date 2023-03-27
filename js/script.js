var addBtn=document.getElementById('addBtn');
var productName=document.getElementById('productName');
var productCompany=document.getElementById('productCompany');
var productPrice=document.getElementById('productPrice');
var productDescription=document.getElementById('productDescription');
var inputs=document.getElementsByClassName('form-control');
var products=[];

if(localStorage.getItem("productlist")==null){
    products=[];
}
else{
    products=JSON.parse(localStorage.getItem("productlist"));
    displayProd();
}

productName.addEventListener('keyup',function(){
    var NameRegex=/^[A-Z][a-z]{2,7}$/;
    if(NameRegex.test(productName.value)){
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        addBtn.removeAttribute('disabled');
    }
 else{
     productName.classList.add('is-invalid');
      productName.classList.remove('is-valid');
      addBtn.setAttribute('disabled',true);
 }
 });
addBtn.onclick=function(){
    addPro();
    displayProd();
    resetForm();
}
//var test=JSON.parse(localStorage.getItem("productlist"));
//console.log(test);
function addPro(){
    var product={
        productName:productName.value,
        productCompany:productCompany.value,
        productPrice:productPrice.value,
        productDescription:productDescription.value,
    }
   
    products.push(product);
    localStorage.setItem("productlist",JSON.stringify(products));
}

function displayProd(){
    var trs="";
    for(var i=0;i<products.length;i++){
        trs+=`<tr>
        <td>`+products[i].productName+`</td>
        <td>`+products[i].productCompany+`</td>
        <td>`+products[i].productPrice+`</td>
        <td>`+products[i].productDescription+`</td>
        <td><button onclick='deleteProd(`+i+`)' class='btn btn-danger'>delete</button></td>
        <td><button onclick='updateProd(`+i+`)' class='btn btn-success'>edit</button> </td>
        </tr>`;
    }

    document.getElementById("tableBody").innerHTML=trs;
}

function resetForm(){
    for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
    }    
}

function deleteProd(t){
    products.splice(t,1);
    localStorage.setItem("productlist",JSON.stringify(products));
    displayProd();
}
function search(searchTxt){
    var trs="";
    for(var i=0;i<products.length;i++){
        if(products[i].productName.toLowerCase().includes(searchTxt.toLowerCase())){
        trs+=`<tr>
        <td>`+products[i].productName+`</td>
        <td>`+products[i].productCompany+`</td>
        <td>`+products[i].productPrice+`</td>
        <td>`+products[i].productDescription+`</td>
        <td><button onclick='deleteProd(`+i+`)' class='btn btn-danger'>delete</button></td>
        <td><button onclick='updateProd(`+i+`)' class='btn btn-success'>edit</button> </td>
        </tr>`;
    }
}
    document.getElementById("tableBody").innerHTML=trs;
}
function updateProd(indice){
    var htmltext = "<input placeholder='product name'class='form-control' id='productName'value='"
    +products[indice].productName+
    "'><input placeholder='product company'class='form-control' id='productCompany' value='"
    +products[indice].productCompany+
    "'><input placeholder='product price'class='form-control' id='productPrice' value='"
    +products[indice].productPrice+
    "'><textarea placeholder='product description'class='form-control' id='productDescription'>"
    +products[indice].productDescription+
    "</textarea><button onclick='save("+indice+")' class='btn btn-warning'>Save Edit</button>";
    document.getElementById("form").innerHTML = htmltext; 
}
  function save(indice) {
    products[indice].productName = document.getElementById("productName").value;
    products[indice].productCompany = document.getElementById("productCompany").value;
    products[indice].productPrice = document.getElementById("productPrice").value;
    products[indice].productDescription = document.getElementById("productDescription").value;
    var htmltext = "<input placeholder='product name'class='form-control' id='productName'value='"
    +products[indice].productName+
    "'><input placeholder='product company'class='form-control' id='productCompany' value='"
    +products[indice].productCompany+
    "'><input placeholder='product price'class='form-control' id='productPrice' value='"
    +products[indice].productPrice+
    "'> <textarea  placeholder='product description'class='form-control' id='productDescription'>"
    +products[indice].productDescription+
        "</textarea> <button id='Btn' onclick='updateProd("+indice+")' class='btn btn-info'>add product</button>";
    document.getElementById("form").innerHTML = htmltext;
    displayProd();
    resetForm();
    addPro();
}
