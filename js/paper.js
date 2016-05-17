var imgs = document.getElementsByClassName("find"),
imgsTemp = document.getElementsByClassName("findTemp"),

ticks = document.getElementsByClassName("findTick"),
tempTicks = document.getElementsByClassName("findTickTemp"),

radio = document.getElementsByClassName("hideMe"), 
radioTemp = document.getElementsByClassName("thumbnailTemp"),

bor = document.getElementsByClassName("thumbnail"), 
borTemp = document.getElementsByClassName("bord"),

num = imgs.length,  
tick = ticks.length,  
numTemp = imgsTemp.length,  
tickTemp = tempTicks.length,  

imgArr = [],
imgArrTemp = [],

imgFade = 0.3;
  
  // Images pushed to array
  if (num > 0){
    for (var i = 0; i < num; i++){
        imgArr.push(imgs[i].src)
    }
  }

  // Template images pushed to array
  if (numTemp > 0){
    for (var i = 0; i < numTemp; i++){
        imgArrTemp.push(imgsTemp[i].src)
    }
  }

  // ticks image & tick opacity
  function reset(){
    for (var j = 0, i = 0; (j < imgs.length) && (i < ticks.length); j++, i++) {
        imgs[j].style.opacity = "1";
        ticks[i].style.opacity = "0";
        radio[i].checked = false;
        bor[i].style.border = "1px solid #ddd";
    }
  }

  // shelfie reset
  function resetTemp(){
    for (var j = 0, i = 0; (j < imgsTemp.length) && (i < tempTicks.length); j++, i++) {
        imgsTemp[j].style.opacity = "1";
        tempTicks[i].style.opacity = "0";
        radioTemp[i].checked = false;
        borTemp[i].style.border = "1px solid #ddd";
    }
  }

  function changeIt(pass){
    var name = pass.src;

    // Check if it's already ticked
    if (pass.style.opacity != imgFade) {
        reset();
        for (var w = 0; w < imgArr.length; w++){
          if (imgArr[w] == name) {
             pass.style.opacity = imgFade;
             // The tick we land on will be the same index as the 
             // image we land on because they both have the same length
             ticks[w].style.opacity = "1";
             radio[w].checked = true;
             bor[w].style.border = "1px dashed #3ea4d9";
          } 
        }
    } else {
      reset();
    }
  }

    function changeItAgain(passMore){
    var name = passMore.src;

    if (passMore.style.opacity != imgFade) {
        resetTemp();
        for (var w = 0; w < imgArrTemp.length; w++){
          if (imgArrTemp[w] == name) {
             passMore.style.opacity = imgFade;

             tempTicks[w].style.opacity = "1";
             radioTemp[w].checked = true;
             borTemp[w].style.border = "1px dashed #3ea4d9";
             console.log(borTemp);
          } 
        }
    } else {
      resetTemp();
    }
  }
