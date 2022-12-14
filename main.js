
var startTime=new Date();
var endTime=new Date();
var startPressed=false;
var bgChangeStarted=false;
var maxWait=20;
var timerID;
if (localStorage.getItem("Lowest")=== null) {
    localStorage.setItem("Lowest", "1000");
    document.getElementById("best").innerText= "0";
    console.log("Set LocalStorage as no previous value")
}
window.onload = function() {
    document.querySelector(".linebreak").style.display="block";
    document.getElementById("remark").style.display="none";    
    document.getElementById("best").innerText = localStorage.getItem("Lowest");
    console.log("Retrieved LocalStorage");
}
// function getNewRandomColor()
// {
//     var myArray = ['red', 'green', 'blue'];    
//     var rand = myArray[Math.floor(Math.random() * myArray.length)];
//     document.getElementById("myDiv").style.backgroundColor = rand;
// }
function startTest()
{
    document.body.style.background=document.response.bgColorChange.options[
document.response.bgColorChange.selectedIndex].text; //Chooeses the background colour from the selelection made from drop down list.
    bgChangeStarted=true;
    startTime=new Date();
}

function remark(responseTime)
{
    var responseString="";
    if (responseTime > 0.20)
        responseString="Well done!";
    if (responseTime >= 0.20 && responseTime < 0.30)
        responseString="Nice!";
    if (responseTime >=0.30 && responseTime < 0.40)
        responseString="Could be better...";
    if (responseTime >=0.40 && responseTime < 0.50)
        responseString="Keep practicing!";
    if (responseTime >=0.50 && responseTime < 1)
        responseString="You can do better than this!";
    if (responseTime >=1)
        responseString="Did you fall asleep?";

    return responseString;
}

function stopTest()
{
    if(bgChangeStarted)
    {
        endTime=new Date();
        var responseTime=(endTime.getTime()-startTime.getTime())/1000;

        document.body.style.background="white";
        document.querySelector(".linebreak").style.display="none";     
        document.getElementById("remark").style.display="block";    
        document.getElementById("remark").innerText=remark(responseTime);    
    //     alert("Your response time is: " + responseTime +
    // " seconds " + "\n" + remark(responseTime));
        startPressed=false;
        bgChangeStarted=false;
        document.getElementById("Startbtn").style.display="block";
        document.getElementById("Stopbtn").style.display="none";
        document.getElementById("previous").innerHTML= responseTime;

        if (responseTime < parseFloat(localStorage.getItem("Lowest"))) {
            localStorage.setItem("Lowest", responseTime);
            console.log("Changed LocalStorage \nDisplayed new LocalStorage") 
            //Changes localStorage if current score is lower than localStorage score
        }
        else {}
        document.getElementById("best").innerHTML = localStorage.getItem("Lowest");
        
    }
    else
    {
        if (!startPressed)
        {
            alert("press start first to start test");
        }
        else
        {       
            clearTimeout(timerID);
            startPressed=false;
            document.querySelector(".linebreak").style.display="none";
            document.getElementById("remark").style.display="block";            
            document.getElementById("remark").innerText="You pressed too early!";
            document.getElementById("Startbtn").style.display="block";
            document.getElementById("Stopbtn").style.display="none";
        }               
    }
}

var randMULTIPLIER=0x015a4e35;
var randINCREMENT=1;
var today=new Date();
var randSeed=today.getSeconds();
function randNumber()
{
    randSeed = (randMULTIPLIER * randSeed + randINCREMENT) % (1 << 31);
    return((randSeed >> 15) & 0x7fff) / 32767;
}

function startit()
{
    document.querySelector(".linebreak").style.display="block";
    document.getElementById("Startbtn").style.display="none";
    document.getElementById("Stopbtn").style.display="block";
    document.getElementById("remark").style.display="none";
    if(startPressed)
    {
        alert("Already started. Press stop to stop");
        return;
    }
    else
    {
        startPressed=true; 
        timerID=setTimeout('startTest()', 6000*randNumber());
    }
}
