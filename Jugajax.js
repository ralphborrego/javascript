// JavaScript Document
var chkEmail = false;
var chkvEmail = false;
var chkUsername = false;
function doErrors(erro, msg){
	if(erro.length > 0){
		erro = erro + ", " + msg;
	}else{
		erro = msg;
	}
	return erro;
}
function doRegister(){
	var err = "";
	var pass = false;
	var password;
	var email;
	var uname;
	var fname;
	var lname;
	if(document.getElementById("Password").value!="" && document.getElementById("Password").value==document.getElementById("vPassword").value){
		document.getElementById("vhPassword").innerHTML="<img src='images/greenCheck.png' />";
		document.getElementById("hPassword").innerHTML="<img src='images/greenCheck.png' />";
		password = document.getElementById("Password").value;
		pass = true;
	}else{
		if(document.getElementById("Password").value==""){
			err = doErrors(err,"Password");
			document.getElementById("hPassword").innerHTML="<img src='images/redX.png' />";
		}
		if(document.getElementById("vPassword").value!=document.getElementById("Password").value){
			err = doErrors(err,"Verify Password");
			document.getElementById("vhPassword").innerHTML="<img src='images/redX.png' />";
		}
	}
	var chkName = false;
	if(document.getElementById("FirstName").value!="" && document.getElementById("LastName").value!=""){
		document.getElementById("hFirstName").innerHTML="<img src='images/greenCheck.png' />";
		document.getElementById("hLastName").innerHTML="<img src='images/greenCheck.png' />";
		fname = document.getElementById("FirstName").value;
		lname = document.getElementById("LastName").value;
		chkName = true;
	}else{
		if(document.getElementById("FirstName").value==""){
			document.getElementById("hFirstName").innerHTML="<img src='images/redX.png' />";
			err = doErrors(err,"First Name");
		}
		if(document.getElementById("LastName").value==""){
			document.getElementById("hLastName").innerHTML="<img src='images/redX.png' />";
			err = doErrors(err,"Last Name");
		}
	}
	confEmail = false;
	if(chkEmail && document.getElementById("Email").value==document.getElementById("vEmail").value){
		document.getElementById("hvEmail").innerHTML="<img src='images/greenCheck.png' />";
		email = document.getElementById("Email").value;
		confEmail = true;
	}else{
		if(chkEmail){
			document.getElementById("hEmail").innerHTML="<img src='images/greenCheck.png' />";
		}else{
			if(verifyEmail(0)){
				document.getElementById("hEmail").innerHTML="<img src='images/redX.png' />";
				err = doErrors(err,"Email already Registered");
			}else{
				document.getElementById("hEmail").innerHTML="<img src='images/redX.png' />";
				err = doErrors(err,"Email");
			}
		}
		if(document.getElementById("vEmail").value!=document.getElementById("Email").value){
			err = doErrors(err,"Validation Email");
			document.getElementById("hvEmail").innerHTML="<img src='images/redX.png' />";
		}
	}
	if(!chkUsername){
		document.getElementById("hUserName").innerHTML="<img src='images/redX.png' />";
		err = doErrors(err,"UserName is too short(4) or already taken");
	}else{
		uname = document.getElementById("UserName").value;
	}
	if(confEmail && pass && chkName && chkUsername){
		document.getElementById("Error").innerHTML="";
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("Error").innerHTML="Thank you for registering.";
					window.location = "index.php";
				}else{
					document.getElementById("Error").innerHTML=xmlhttp.responseText;
				}
			}
		}
		lyn = "Functions/HiddenFunctions.php?type=creg&fname="+fname+"&lname="+lname+"&email="+email+"&uname="+uname+"&pass="+password;
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}else{
		document.getElementById("Error").innerHTML="<font color='red'>ERRORS "+err+"</font>";
		return false;
	}
}
function UserRegister(txt,field){
	if(field==2){
		t = "UserName";
	}else{
		t = "Email";
	}
	var currentField = document.getElementById(t).value
	if(t=="UserName"){
		if(currentField.length>0){
			var xmlhttp = getXMLHttp();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					document.getElementById("h"+t).innerHTML=xmlhttp.responseText;
					if(xmlhttp.responseText=="<img src='images/greenCheck.png'/>"){
						chkUsername = true;
					}else{
						chkUsername = false;
					}
				}
			}
			xmlhttp.open("GET","Functions/HiddenFunctions.php?type=reg&val="+currentField+"&fld="+t,true);
			xmlhttp.send();
		}
	}else{
		if(verifyEmail(field)){
			var xmlhttp = getXMLHttp();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					document.getElementById("h"+t).innerHTML=xmlhttp.responseText;
					if(xmlhttp.responseText=="<img src='images/greenCheck.png'/>"){
						chkEmail = true;
					}else{
						chkEmail = false;
					}					
				}
			}
			xmlhttp.open("GET","Functions/HiddenFunctions.php?type=reg&val="+currentField+"&fld="+t,true);
			xmlhttp.send();
		}
	}
}
function verifyEmail(cfield){
var status = false;
var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if(cfield==0){
		if(document.getElementById("Email").value.search(emailRegEx)== -1){
     		document.getElementById("hEmail").innerHTML="<img src='images/redX.png'/>";
		}else{
			//document.getElementById("hEmail").innerHTML="<img src='images/greenCheck.png' />";
			status = true;
		}
	}else{
		if(document.getElementById("Email").value != document.getElementById("vEmail").value){
        	document.getElementById("hvEmail").innerHTML="<img src='images/redX.png' alt='Not Matching' />";
    	}else{
			document.getElementById("hvEmail").innerHTML="<img src='images/greenCheck.png' />";
		}
	}
    return status;
}
function HandleResponse(response)
{
  document.getElementById('ResponseDiv').innerHTML = response;
}
function FillPage(pg){
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			document.getElementById("h"+t).innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","/Functions/Functions.php?type=page&v="+pg,true);
	xmlhttp.send();
}
function getXMLHttp(){
  var xmlHttp
  try{
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e){
    //Internet Explorer
    try{
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e){
      try{
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e){
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}
function CngTxt(id,txt){
 var obj=document.getElementById(id);
 if (txt){ obj.innerHTML=txt; }
 else {  obj.innerHTML='some standard text'; }
}