onload = function() {
  quantities = document.getElementsByClassName("quantity");
  costs = document.getElementsByClassName("cost");
  totalQuantity = document.getElementById("total-quantity");
  totalCost = document.getElementById("total-cost");
  for (i = 0;i<quantities.length;i++) {
    quantities.item(i).innerText = "0";
    costs.item(i).innerText = "0";
  }
  usage.addEventListener("keyup",calcElectricCost);
  usage.addEventListener("change",calcElectricCost);
}

var quantityRange = [0,50,100,200,300,400];
var steps = [50,50,100,100,100];
var unitPrices = [1678,1734,2014,2536,2834,2927];

function calcElectricCost(){

  //calculate quantity in each range
  for (var i = 0;i < quantities.length-1; i++){
    quantities.item(i).innerText = Math.max(0,Math.min(steps[i],usage.value - quantityRange[i]));
  }
  quantities.item(quantities.length-1).innerText = Math.max(0,usage.value - quantityRange[quantityRange.length-1]);

  //calculate cost
  totalQuantity.innerText = usage.value;

  var result = 0;
  var temp = 0;
  for (var i = 0; i < quantities.length; i++) {
    temp = unitPrices[i] * quantities.item(i).innerText * 1.1;
    result += temp;
    costs.item(i).innerText = numberWithCommas(Math.round(temp));
  }
  totalCost.innerText = numberWithCommas(Math.round(result));
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
