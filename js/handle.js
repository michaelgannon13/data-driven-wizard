  var pos, leaf, shelf, tab3, next, fb;
  pos = document.getElementById('poster');
  leaf = document.getElementById('leaflet'); 
  shelf = document.getElementById('shelf');
  tab3 = document.getElementById('tab3');
  next = document.getElementsByClassName('next');
  fb = document.getElementById('social');

  var rad = document.getElementsByTagName("input");
  var text = document.getElementsByClassName('sel');

  // Highlight next button
  function highlight(){
    document.getElementById("jump").style.color="#fff";
    document.getElementById("jump").style.backgroundColor="#E212A3";

    document.getElementById("final").style.color="#fff";
    document.getElementById("final").style.backgroundColor="#E212A3";
    setTimeout(revert, 800);
  }

  function revert(){
    document.getElementById("jump").style.color="#5AB1DE";
    document.getElementById("jump").style.backgroundColor="#F8F8F8";
  }

 // text click
 function daFunction(id){
    var radQues = id.id;

    if (radQues == "sm") {
      document.getElementById("social").checked = true;
    } else if (radQues == "p") {
      document.getElementById("product").checked = true;
    } else if (radQues == "s") {
      document.getElementById("service").checked = true;
    } else if (radQues == "pr") {
      document.getElementById("print").checked = true;
    } else if (radQues == "ds") {
      document.getElementById("screen").checked = true;
    } else if (radQues == "web") {
      document.getElementById("wb").checked = true;
    } else if (radQues == "p") {
      document.getElementById("poster").checked = true;
    } else if (radQues == "l") {
      document.getElementById("leaflet").checked = true;
    } else if (radQues == "s") {
      document.getElementById("shelf").checked = true;
    } else if (radQues == "portrait") {
      document.getElementById("por").checked = true;
    } else if (radQues == "landscape") {
      document.getElementById("lan").checked = true;
    } else if (radQues == "pro") {
      document.getElementById("prrr").checked = true;
    } else if (radQues == "ser") {
      document.getElementById("sr").checked = true;
    } else if (radQues == "ev") {
      document.getElementById("event").checked = true;
    } else if (radQues == "txt") {
      document.getElementById("txtRad").checked = true;
    } else if (radQues == "txtImg") {
      document.getElementById("txtImgRad").checked = true;
    } else if (radQues == "auto") {
      document.getElementById("autoId").checked = true;
    } else if (radQues == "manual") {
      document.getElementById("manualId").checked = true;
    } 
  }
