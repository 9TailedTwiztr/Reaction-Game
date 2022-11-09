
var startTime=new Date();
var endTime=new Date();
var startPressed=false;
var bgChangeStarted=false;
var maxWait=20;
var timerID;
localStorage.key = ("Best");
if (localStorage.getItem("Best")=== null) {
    localStorage.setItem("Best", "1000");
    document.getElementById("best").innerText= "0";
    console.log("Set LocalStorage as no previous value")
}
window.onload = function() {
    document.getElementById("best").innerText = localStorage.getItem("Best");
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
document.response.bgColorChange.selectedIndex].text;
    bgChangeStarted=true;
    startTime=new Date();
}

function remark(responseTime)
{
    var responseString="";
    if (responseTime < 0.20)
        responseString="Well done!";
    if (responseTime >= 0.30 && responseTime < 0.20)
        responseString="Nice!";
    if (responseTime >=0.40 && responseTime < 0.30)
        responseString="Could be better...";
    if (responseTime >=0.50 && responseTime < 0.60)
        responseString="Keep practicing!";
    if (responseTime >=0.60 && responseTime < 1)
        responseString="Have you been drinking?";
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
        alert("Your response time is: " + responseTime +
    " seconds " + "\n" + remark(responseTime));
        startPressed=false;
        bgChangeStarted=false;
        document.getElementById("Startbtn").style.display="block";
        document.getElementById("Stopbtn").style.display="none";
        document.getElementById("previous").innerHTML= responseTime;

        if (responseTime < parseFloat(localStorage.getItem("Best"))) {
            localStorage.setItem("Best", responseTime);
            console.log("Changed LocalStorage \nDisplayed new LocalStorage")
        }
        else {}
        document.getElementById("best").innerHTML = localStorage.getItem("Best");
        
        

        
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
            alert("You pressed too early");
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
    document.getElementById("Startbtn").style.display="none";
    document.getElementById("Stopbtn").style.display="block";
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
