
window.onload = function(){
  var decBtn = document.querySelector("#decBtn");
  var addBtn = document.getElementById("addBtn");
  var btnCalc = document.querySelector("#calc");
  resultCell = document.querySelector('#result-cell');


  decBtn.addEventListener("click",removeCell);
  addBtn.addEventListener("click",addCell);
  addBtn.addEventListener("click",calc);
  btnCalc.addEventListener("click",calc);
  updateEventListener();
  calc();
}

function calc() {
  var cf = [];
  var cumulativeCF = [];
  var inputs = document.getElementsByTagName("input");

  //divide into input cells and cumulative cells based on "disabled" status:
  for (i=0;i<inputs.length;i++) {
    if (inputs.item(i).id == "result-cell" || inputs.item(i).id =="search") {continue;}
    else if (inputs.item(i).disabled) {cumulativeCF.push(inputs.item(i));}
    else {cf.push(inputs.item(i));}
  }

  //calculate cumulative cashflow:
  cumulativeCF[0].value = parseFloat(cf[0].value);
  for (i=1;i<cf.length;i++) {
    cumulativeCF[i].value = parseFloat(cumulativeCF[i-1].value) + parseFloat(cf[i].value);
  }

  //calculate payback period:
  //find the earliest positive cumulative CF
  var breakeven = 0;
  var prevCumulative = 0;
  var labs = document.getElementsByTagName('label');
  // var c = document.getElementsByTagName('input');

  var cu,cf; //cu: cell with cumulative cashflow; cf: cell with current period cashflow
  var currentCF; //value of cf
  var paybackResult; //this is the result

  for (i=0;i<labs.length;i++) {
    cu = document.getElementById('cumulative'+i);
    cf = document.getElementById('period'+i);
    if (cu.value >= 0) {
      breakeven = parseFloat(cu.value);
      currentCF = parseFloat(cf.value);
      prevCumulative = parseFloat(document.getElementById('cumulative'+(i-1)).value);
      paybackResult = parseFloat(i-1);
      break;
    }
  }

  if (currentCF != undefined) {
    paybackResult += Math.abs(prevCumulative)/currentCF;
    paybackResult = Math.round((paybackResult + Number.EPSILON) * 100) /100;
  }
  else {
    paybackResult = "Investment not yet recovered.";
    resultCell.size = paybackResult.length;
  }
  resultCell.value = paybackResult;

}


function updateEventListener() {
  var c = document.getElementsByTagName('input');
  for (i=0;i<c.length;i++) {
    if (!c.item(i).disabled) {
      c.item(i).addEventListener("change",calc);
    }
  }
}

function removeCell() {
  var cells = document.getElementsByTagName("input");
  var labs = document.getElementsByTagName("label");
  //if 2 rows remain => not to delete further
  if (labs.length == 2) {return;}
  else {
    //delete row:
    cells.item(cells.length-2).parentElement.parentElement.remove();
  }

}

function addCell() {
  var labs = document.getElementsByTagName("label");
  var newLabel = document.createElement('label');
  var node1 = document.createTextNode(labs.length);

  newLabel.appendChild(node1);

  //add new tr and td elements
  var trow = document.createElement('tr');
  var tdata1 = document.createElement('td');
  var tdata2 = document.createElement('td');
  var tdata3 = document.createElement('td');

  //add content to the td elements
  var cellCF = document.createElement('input');
  cellCF.value = 0;
  cellCF.id = "period"+ labs.length;
  
  var cellCumulative = document.createElement('input');
  // cellCumulative.readOnly = true;
  cellCumulative.disabled = true;
  cellCumulative.id = "cumulative"+labs.length;

  var table = document.getElementById('payback');

  table.appendChild(trow);
  trow.appendChild(tdata1);
  trow.appendChild(tdata2);
  trow.appendChild(tdata3);
  tdata1.appendChild(newLabel);
  tdata2.appendChild(cellCF);
  tdata3.appendChild(cellCumulative);
 
  updateEventListener();
}