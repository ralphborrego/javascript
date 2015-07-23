// JavaScript Document
var b = false;
var addid = 0;
var cship = "";
function dopickup(shi,to){
	if(document.getElementById("chkpickup").checked){
		document.getElementById("shiptotals").innerHTML = "$0.00";
		document.getElementById("ctotal").innerHTML = "$"+to;
	}else{
		document.getElementById("shiptotals").innerHTML = "$5.00 - $11.00";
		document.getElementById("ctotal").innerHTML = "$"+shi;
	}
}
function GetComments(i,d){
	if(i===1){
		document.getElementById("comres").style.display = "none";
		document.getElementById("usr").style.display = "block";
		dv = "com"+d;
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				document.getElementById("displeft").innerHTML = xmlhttp.responseText;
			}
		}
		lyn = "functions/managehelper.php?action=2&cid="+d;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();	
	}else if(i===2){
		document.getElementById("comres").style.display = "block";
		document.getElementById("usr").style.display = "none";
	}else if(i===3){
		dv = "com"+d;
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById(dv).innerHTML = "Approved"
				}
			}
		}
		lyn = "functions/managehelper.php?action=1&cid="+d;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();		
	}
}
function leavecomment(pid){
	boo = true;
	name = document.getElementById("name").value;
	txt = document.getElementById("text").value;
	rad = $('input[name="rating"]:checked').val();
	if(name==null || name==""){
		document.getElementById("name").style.borderColor="red";
		boo = false
	}else{
		document.getElementById("name").style.borderColor="";
	}
	if(txt==null || txt==""){
		document.getElementById("text").style.borderColor="red";
		boo = false
	}else{
		document.getElementById("text").style.borderColor="";
	}
	if(boo){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("write").innerHTML = "<bold><font color='green'>Thank you for the comment.</font><bold>";
					//document.getElementById("comm").style.display = "block";
				}
			}
		}
		lyn = "functions/commenthelper.php?action=1&name="+name+"&txt="+txt+"&rat="+rad+"&id="+pid;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();
	}
}
function HideTrack(){
	var t = document.getElementById("pickup").checked;
	if(t){
		document.getElementById("tracking").style.display = "none";
	}else{
		document.getElementById("tracking").style.display = "block";
	}
}
function ChangePassword(){
	val = true;
	var password = document.getElementById("password").value;
	var verify = document.getElementById("verify").value;
	var em = document.getElementById("email").value;
	var cd = document.getElementById("code").value;
	if(password==null || password==""){
		document.getElementById("password").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("password").style.borderColor="";
	}
	if(verify!=password){
		document.getElementById("verify").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("verify").style.borderColor="";
	}
	if(val){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("set").style.display = "none";
					document.getElementById("res").style.display = "block";
				}
			}
		}
		lyn = "functions/userhelper.php?action=7&email="+document.getElementById("email").value;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();
	}
}
function forgot(){
	chkEmail(true);
	if(b){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("set").style.display = "none";
					document.getElementById("res").style.display = "block";
				}
			}
		}
		lyn = "functions/userhelper.php?action=7&email="+document.getElementById("email").value;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();
	}
}
function review(v){
	if(v===1){
		document.getElementById("comm").style.display = "none";
		document.getElementById("write").style.display = "block";
	}else{
		document.getElementById("write").style.display = "none";
		document.getElementById("comm").style.display = "block";
	}
}
function OrderSearch(ty){
	if(ty===1){
		bd = document.getElementById("bdate").value;
		ed = document.getElementById("edate").value;
		vurl = "functions/orders.php?action="+(ty+2)+"&bd="+bd+"&ed="+ed;
		//wh = "WHERE cartdate BETWEEN '"+bd+"' AND '"+ed+"' ORDER BY cartdate DESC";
	}else if(ty===2){
		cid = document.getElementById("ordernumber").value;
		vurl = "functions/orders.php?action="+(ty+2)+"&id="+cid;
		//wh = "WHERE id = " + document.getElementById("txtid").value;o
	}else{
		vurl = "functions/orders.php?action="+(ty+2);
	}
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.responseText=="All Good"){
				//document.getElementById("errors").src = "carthelper.php?action0=5";
				//location.reload();
			}else{
				document.getElementById("displeft").style.display = "block";
				document.getElementById("displeft").innerHTML = xmlhttp.responseText;
				document.getElementById("cartdisplay").innerHTML = "";
			}
		}
	}
	xmlhttp.open("GET",vurl,false);
	xmlhttp.send();
}
function OrderView(ty){
	document.getElementById("dates").style.display = "none";
	document.getElementById("onumber").style.display = "none";
	//document.getElementById("neworders").style.display = "none";
	if(ty===1){
		document.getElementById("dates").style.display = "block";
	}else if(ty===2){
		document.getElementById("onumber").style.display = "block";
	/*}else{
		document.getElementById("neworders").style.display = "block";
		return;*/
	}	
}
function addShipment(id){
	var valid = false;
	if(document.getElementById("pickup").checked){
		"functions/shiphelper.php?action=1&id="+id+"&pickup=1";
		valid = true;
	}else{
		var track = document.getElementById("track").value;
		var e = document.getElementById("shipfee");
		var shipcost = e.options[e.selectedIndex].value;
		if(track==null || track==""){
			document.getElementById("tracking").style.borderColor = "red";
			valid = false;
		}else{
			document.getElementById("tracking").style.borderColor = "";
			"functions/shiphelper.php?action=1&id="+id+"&tracking="+track+"&fee="+shipcost;
			valid = true;
		}
	}	
	if(!valid){
		return;
	}
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.responseText=="All Good"){
			}else{
				document.getElementById("cartdisplay").innerHTML = xmlhttp.responseText;
			}
		}
	}
	vurl = "functions/shiphelper.php?action=1&id="+id+"&tracking="+track+"&fee="+shipcost;
	xmlhttp.open("GET",vurl,false);
	xmlhttp.send();
}
function doShipping(id){
	window.location="shipping.php?id="+id;
}
function callURL(vurl){
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.responseText=="All Good"){
					//document.getElementById("errors").src = "carthelper.php?action0=5";
					//location.reload();
			}else{
				document.getElementById("cartdisplay").innerHTML = xmlhttp.responseText;
			}
		}
	}
	//vurl = "functions/orders.php?action=2&id="+id;
	xmlhttp.open("GET",vurl,false);
	xmlhttp.send();
}
function completeOrder(id){
	callURL("functions/orders.php?action=2&id="+id);
	/*var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					//document.getElementById("errors").src = "carthelper.php?action0=5";
					//location.reload();
				}else{
					document.getElementById("cartdisplay").innerHTML = xmlhttp.responseText;
				}
			}
		}
		vurl = "functions/orders.php?action=2&id="+id;
		xmlhttp.open("GET",vurl,false);
		xmlhttp.send();*/
}
function addColor(){
	if(document.getElementById("colors").style.display=="none"){
		document.getElementById("colors").style.display = "block";
	}else{
		document.getElementById("colors").style.display = "none";
	}
}
function GetOrders(id){
	var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					//document.getElementById("errors").src = "carthelper.php?action0=5";
					//location.reload();
				}else{
					document.getElementById("cartdisplay").style.display = "block";
					document.getElementById("cartdisplay").innerHTML = xmlhttp.responseText;
				}
			}
		}
		vurl = "functions/orders.php?action=1&id="+id;
		xmlhttp.open("GET",vurl,false);
		xmlhttp.send();
}
function allowCopy(){
	if(document.getElementById("copy").checked){
		document.getElementById("txtarea1").style.display = "block";
		document.getElementById("txtarea").style.display = "none";
	}else{
		document.getElementById("txtarea").style.display = "block";
		document.getElementById("txtarea1").style.display = "none";
	}
}
function catShow(catid,numb){
	window.location = "category.php?cat="+catid+"&number="+numb;
}
function searchProducts(){
	var srch = document.getElementById("searchtxt").value;
	location.replace("search.php?search="+srch);
}
function adminOut(){
	location.replace("../account.php?action=logout");
}
function adminredir(id){
	window.open("/admin/products.php?pid="+id,"_blank");
}
function Checkout(id){
	cartUpdate(true);
	var boo = true;
	var er = "Please complete these fields (Shipping)<br/>";
	var name = document.getElementById("customer").value;
	var address = document.getElementById("addr").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("postcode").value;
	var em = document.getElementById("email").value;
	var pick = document.getElementById("chkpickup").checked;
	var atpos = em.indexOf("@");
	var dotpos = em.indexOf(".");	
	if(name==null || name==""){
		document.getElementById("customer").style.borderColor="red";
		er = er + "**Name**<br />";
		boo = false
	}else{
		document.getElementById("customer").style.borderColor="";
	}
	if(atpos<1 || dotpos<atpos+2 || dotpos>=email.length){
		document.getElementById("email").style.borderColor="red";
		er = er + "**Email**<br />";
		boo = false;
	}else{
		document.getElementById("email").style.borderColor="";
	}
	if(address==null || address==""){
		document.getElementById("addr").style.borderColor="red";
		er = er + "**Address**<br />";
		boo = false
	}else{
		document.getElementById("addr").style.borderColor="";
	}
	if(city==null || city==""){
		document.getElementById("city").style.borderColor="red";
		er = er + "**City**<br/>";
		boo = false
	}else{
		document.getElementById("city").style.borderColor="";
	}
	if(zip==null || zip==""){
		document.getElementById("postcode").style.borderColor="red";
		er = er + "**Zip**";
		boo = false
	}else{
		document.getElementById("postcode").style.borderColor="";
	}
	if(state==null || state==""){
		document.getElementById("state").style.borderColor="red";
		er = er + "**State**";
		boo = false
	}else{
		document.getElementById("state").style.borderColor="";
	}
	if(boo){
		document.getElementById("errors").innerHTML = "<font color='green'>Processing your Order</font>";
	}else{
		document.getElementById("errors").innerHTML = "<font color='red'>" + er + "</font>";
	}
	if(boo){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					location.replace("vieworder.php");
					//location.reload();
				}else{
					document.getElementById("errors").innerHTML = xmlhttp.responseText;
				}
			}
		}
		vurl = "carthelper.php?action0=4&addy="+address+"&city="+city+"&state="+state+"&zip="+zip+"&name="+name+"&email="+em+"&pickup="+pick;
		xmlhttp.open("GET",vurl,false);
		xmlhttp.send();
	}
}
function setAddress(id){
	document.getElementById("city").value = document.getElementById("city"+id).value;
	document.getElementById("postcode").value = document.getElementById("zip"+id).value;
	addy = document.getElementById("address"+id).value;
	document.getElementById("addr").value = addy;
	document.getElementById("state").value = document.getElementById("state"+id).value;
}
function saveAddress(id,func){
	var boo = true;
	if(func != 3){
		var addy = document.getElementById("address"+id).value;
		var city = document.getElementById("city"+id).value;
		var state = document.getElementById("state"+id).value;
		var zip = document.getElementById("zip"+id).value;
		var name = document.getElementById("name"+id).value;		
		if(addy==null || addy==""){
			document.getElementById("address"+id).style.borderColor="red";
			boo = false
		}else{
			document.getElementById("address"+id).style.borderColor="";
		}
		if(city==null || city==""){
			document.getElementById("city"+id).style.borderColor="red";
			boo = false
		}else{
			document.getElementById("city"+id).style.borderColor="";
		}
		if(state==null || state==""){
			document.getElementById("state"+id).style.borderColor="red";
			boo = false
		}else{
			document.getElementById("state"+id).style.borderColor="";
		}
		if(zip==null || zip==""){
			document.getElementById("zip"+id).style.borderColor="red";
			boo = false
		}else{
			document.getElementById("zip"+id).style.borderColor="";
		}
		if(name==null || name==""){
			document.getElementById("name"+id).style.borderColor="red";
			boo = false
		}else{
			document.getElementById("name"+id).style.borderColor="";
		}
	}
	if(boo){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					if(id < 1){
						document.getElementById("res"+id).innerHTML = "<strong><font color='green'>Saved</font></strong>";
					}else{
						document.getElementById("res"+id).innerHTML = "<strong><font color='green'>Updated</font></strong>";
					}
					location.reload();
				}else{
					document.getElementById("res"+id).innerHTML = xmlhttp.responseText;
				}
			}
		}
		vurl = "functions/userhelper.php?action="+func+"&addy="+addy+"&city="+city+"&state="+state+"&zip="+zip+"&name="+name+"&id="+id;
		xmlhttp.open("GET",vurl,false);
		xmlhttp.send();
	}
}
function cartUpdate(optionalArg){
	optionalArg = (typeof optionalArg === "undefined") ? false : optionalArg;
	var inf = "";
	var vurl = "carthelper.php?";
	var myform = document.forms.cart;
	var ids = myform.elements['id[]'];
	var rems = myform.elements['remove[]'];
	var qtys = myform.elements['qty[]'];
	var des = myform.elements['desc'];
	var tot = myform.elements['total'];
	if(ids.length in window){
		var id = ids.value;
		var qty = qtys.value;
		var rem = rems.checked;
		var desc = des.value;
		var tot = tot.value;
		if(rem){
			inf = "action0=2&id0="+id;
		}else{
			inf = "action0=3&id0="+id+"&qty0="+qty+"&desc0="+desc+"&tot0="+tot;
		}
	}else{
		
		for(i = 0; i < ids.length; i++){
			var id = ids[i];
			var rem = rems[i].checked;
			var qty = qtys[i];
			var desc = des[i];
			desc = desc.value;
			if(i>0){
				inf = inf+"&";
			}
			if(rem){
				inf = inf+"action"+i+"=2&id"+i+"="+id.value;
			}else{
				inf = inf+"action"+i+"=3&id"+i+"="+id.value+"&qty"+i+"="+qty.value+"&desc"+i+"="+desc+"tot"+i+"="+tot;
			}	
		}		
	}
	var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					if(!optionalArg){
						location.reload();
					}					
				}
			}
		}
		vurl = vurl + inf;
		xmlhttp.open("GET",vurl,false);
		xmlhttp.send();
}
function chkAddress(add){
	if(document.getElementById("new").style.display = "block"){
		document.getElementById("new").style.display = "none";
	}
	if(addid > 0){
		document.getElementById(addid).style.display = "none";
	}
	if(add == ""){
		document.getElementById("new").style.display = "block";
	}else{
		document.getElementById(add).style.display = "block";
	}
	addid = add;
}
function newAddress(){
	if(document.getElementById("new").style.display = "none"){
		document.getElementById("new").style.display = "block";
	}
}
function register(){
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var verify = document.getElementById("verify").value;
	var telephone = document.getElementById("telephone").value;
	var val = true;
	if(firstname==null || firstname==""){
		document.getElementById("firstname").style.borderColor="red";
		val = false
	}else{
		document.getElementById("firstname").style.borderColor="";
	}
	if(lastname==null || lastname==""){
		document.getElementById("lastname").style.borderColor="red";
		val = false
	}else{
		document.getElementById("lastname").style.borderColor="";
	}
	if(password==null || password==""){
		document.getElementById("password").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("password").style.borderColor="";
	}
	if(verify!=password){
		document.getElementById("verify").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("verify").style.borderColor="";
	}
	if(!b){
		val = false;
	}
	if(val){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					window.setTimeout(function(){
						window.location = "account.php";
					},2000);
					//window.location = "index.php";
				}
			}
		}
		lyn = "functions/register.php?reg=register&firstname="+firstname+'&lastname='+lastname+'&email='+email+'&password='+password+'&telephone='+telephone;
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}
}
function chkCategory(id){
	if(id != ""){
		var xmlhttp = getXMLHttp();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4){
					document.getElementById("tags").style.display = "block";
					document.getElementById("tags").innerHTML = xmlhttp.responseText;
				}
			}
			lyn = "functions/newproducts.php?ptype=3&id="+id;
			xmlhttp.open("GET",lyn,true);
			xmlhttp.send();
	}
}
function chkEmail(a){
	email = document.getElementById("email").value;
	var atpos = email.indexOf("@");
	var dotpos = email.indexOf(".");
	if(atpos<1 || dotpos<atpos+2 || dotpos>=email.length){
		document.getElementById("email").style.borderColor="red";		
	}else{
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("email").style.borderColor="";
					b = true;
				}else{
					document.getElementById("email").style.borderColor="red";
				}
			}
		}
		if(a){
			lyn = "functions/register.php?reg=validate&email="+document.getElementById("email").value+"&forgot=1";
		}else{
			lyn = "functions/register.php?reg=validate&email="+document.getElementById("email").value;
		}
		
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();
	}
}
function ValidateForm(c){
	var name = document.forms["contact-form"]["name"].value;
	var email = document.forms["contact-form"]["email"].value;
	var comment = document.forms["contact-form"]["comment"].value;
	var capt = document.forms["contact-form"]["captcha"].value;
	var val = true;
	if(name==null || name==""){
		document.getElementById("nameerr").style.display = "block";
		val = false;
	}else{
		document.getElementById("nameerr").style.display = "none";
	}
	var atpos = email.indexOf("@");
	var dotpos = email.indexOf(".");
	if(atpos<1 || dotpos<atpos+2 || dotpos>=email.length){
		document.getElementById("emailerr").style.display = "block";
		val = false;
	}else{
		document.getElementById("emailerr").style.display = "none";
	}
	if(comment.length<5){
		document.getElementById("commenterr").style.display = "block";
		val = false;
	}else{
		document.getElementById("commenterr").style.display = "none";
	}
	if(capt!==c){
		document.getElementById("captchaerr").style.display = "block";
		val = false;
	}else{
		document.getElementById("captchaerr").style.display = "none";
	}
	if(val){
		document.getElementById("results").innerHTML="";
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("results").innerHTML="<h2>Thank you for contacting us.</h2>";
					//window.location = "index.php";
				}else{
					alert("results");
					document.getElementById("results").innerHTML=xmlhttp.responseText;
				}
			}
		}
		lyn = "functions/sendemail.php?name="+name+'&email='+email+'&comment='+comment
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}
}
function sendForm(){
	$("#contact-form").submit(function(){
		$.post('functions/sendcontact.php',
		$(this).serialize(),
		function(data){
			$("#results").html(data)
		});
	});
}
function chkSize(s){
	switch(s){
		case "5":
			document.getElementById("pricetag").innerHTML = "$3.99";
			break;
		case "10":
			document.getElementById("pricetag").innerHTML = "$6.99";			
			break;
		case "15":
			document.getElementById("pricetag").innerHTML = "$9.99";
			break;
		case "30":
			document.getElementById("pricetag").innerHTML = "$13.99";
			break;
		case "50":
			document.getElementById("pricetag").innerHTML = "$23.99";
			break;
	}
}
function DeleteProduct(){
	if(confirm('Delete this product?')){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					alert("Deleted");
					location.reload();
				}else{
					document.getElementById("results").innerHTML=xmlhttp.responseText;
				}
			}
		}
		lyn = "functions/newproducts.php?ptype=4";
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}else{
		alert('Delete Cancelled');
	}
}
function ValidateProduct(upd){
	var tag = "";
	var col = "";
	var name = document.getElementById("name").value;
	var b = document.getElementById("brand");
	var brand = b.options[b.selectedIndex].value;
	var c = document.getElementById("category");
	var category = c.options[c.selectedIndex].value;
	var stock = document.getElementById("stock").value;
	var code = document.getElementById("code").value;
	var reward = document.getElementById("reward").value;
	var j = document.getElementById("juice").checked;
	var f = document.getElementById("featured").checked;
	if(document.getElementById("copy").checked){
		var details = document.getElementById("desc").value;
	}else{
		var nicE = new nicEditors.findEditor("myNicEditor");
		var details = nicE.getContent();
	}
	if(upd!=1){
		tag = document.getElementById("tag").value;	
	}
	var price = document.getElementById("price").value;
	var val = true;
	if(!isNumeric(price)){
		document.getElementById("price").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("price").style.borderColor = "";
	}	
	if(name==null || name==""){
		document.getElementById("name").style.borderColor = "red";
		val = false;
	}else{
		document.getElementById("name").style.borderColor = "";
	}
	if(stock>0 && isNaN(stock)){
		document.getElementById("stock").style.borderColor = "red";
		val = false;
	}else{
		document.getElementById("stock").style.borderColor = "";		
	}
	if(isNaN(reward)){
		document.getElementById("reward").style.borderColor = "red";
		val = false;
	}else{
		document.getElementById("reward").style.borderColor = "";		
	}
	if(details==null || details==""){
		if(document.getElementById("copy").checked){
			document.getElementById("desc").style.borderColor="red";
			val = false;
		}else{
			document.getElementById("myNicEditor").style.borderColor="red";
			val = false;
		}		
	}else{
		if(document.getElementById("copy").checked){
			document.getElementById("desc").style.borderColor="";
		}else{
			document.getElementById("myNicEditor").style.borderColor="";
		}
		
		//document.getElementById("detailerr").style.display = "none";
	}
	if(document.getElementById("color").checked){
		var numchk = $('.chkcolor').length;
		var checkarray = new Array();
		var i = 1;
		while($("#colorchk"+i).length > 0){
			if($("#colorchk"+i).is(":checked")){
				col = col + document.getElementById("colortxt"+i).value+",";
			}
			i++;
		}
	}
	if(val){
		document.getElementById("results").innerHTML="";
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					document.getElementById("frm1").style.display = "none";
					//if(!j){
						document.getElementById("submitarea").style.display = "none";
						document.getElementById("imagearea").style.display = "block";
					//}
				}else{
					document.getElementById("results").innerHTML=xmlhttp.responseText;
				}
			}
		}
		lyn = "functions/newproducts.php?name="+name+'&stock='+stock+'&reward='+reward+'&details='+details+'&code='+code+'&brand='+brand+'&juice='+j+'&featured='+f+'&category='+category+'&price='+price+'&ptype='+upd+"&tag="+tag+"&clr="+col;
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}
}
function login(){
	var n = document.getElementById("name").value;
	var p = document.getElementById("pass").value;
	var val = true;
	if(n==null || n==""){
		document.getElementById("name").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("name").style.borderColor="";
	}
	if(p==null || p==""){
		document.getElementById("pass").style.borderColor="red";
		val = false;
	}else{
		document.getElementById("pass").style.borderColor="";
	}
	if(val){
		document.getElementById("results").innerHTML="";
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					location.reload();
				}else{
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML=xmlhttp.responseText;
				}
			}
		}
		lyn = "functions/login.php?name="+n+'&pass='+p;
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}
}
function UpdateImage(n){
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.responseText=="All Good"){
				
			}else{
				alert(responseText);
			}
		}
	}
	lyn = "functions/newproducts.php?ptype=2&imgid="+n;
	xmlhttp.open("GET",lyn,true);
	xmlhttp.send();
}
function ShowImages(n){
	if(n===0){
		document.getElementById("imagearea").style.display = "block";
	}else{
		document.getElementById("imgview").style.display = "block";
	}
}
function juiceCheck(){
	var j = document.getElementById("juice").checked;
	if(j){
		document.getElementById("defaultj").style.display = "block";
	}else{
		document.getElementById("defaultj").style.display = "none";
	}
}
function cartFunction(i,func,hc){
	var boo = true;
	qty = document.getElementById("qty").value;
	desc = "";
	if(hc > 0){
		var sel = $("#colorarea input[type='radio']:checked");
		if(sel.length > 0){
			desc = sel.val();
		}else{
			document.getElementById("colorarea").style.borderColor = "red";
			boo = false;
		}
	}
	if(typeof(document.getElementById("size")) != 'undefined' && document.getElementById("size") != null){
		var size = document.getElementById("size").value;
		var nic = document.getElementById("nic").value;
		if(size=="na"){
			document.getElementById("size").style.borderColor = "red";
			boo = false;
		}else{
			document.getElementById("size").style.borderColor = "";
			desc = size;
		}
		if(nic=="na"){
			document.getElementById("nic").style.borderColor = "red";
			boo = false;
		}else{
			document.getElementById("nic").style.borderColor = "";
			desc = desc+"|"+nic;
		}
	}
	if(boo || func == 2){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.responseText=="All Good"){
					location.reload();
				}else{
					document.getElementById("results").style.display = "block";
					document.getElementById("results").innerHTML=xmlhttp.responseText;
					//location.reload();
				}
			}
		}
		lyn = "carthelper.php?action0="+func+"&id0="+i+"&qty0="+qty+"&desc0="+desc;
		xmlhttp.open("GET",lyn,false);
		xmlhttp.send();	
	}	
}
function FillSide(){
	var xmlhttp = getXMLHttp();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			
			//document.getElementById("sidefeatures").innerHTML=xmlhttp.responseText;
		}
	}
	lyn = "functions/side.php";
	xmlhttp.open("GET",lyn,true);
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
function isNumeric(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}