var chkcnt = 0;
function addtocart(typeid, itmID, pname) {
    $.ajax({
        type: "POST",
        url: "functions/customfunctions.aspx",
        data: {ctype:typeid, cval: itmID}
    }).done(function (msg) {
        document.getElementById("cartitems").innerHTML = "<span>/</span><li class='top-menu-em' id='cartitems'><a href='cart.aspx'><i class='icon-shopping-cart'></i>" + cleanRet(msg,1) + " Items</a></li>";
        if (pname === 1) {
            location.reload(false);
        }
        if (document.getElementById("btn-group").style = "block") {
            document.getElementById("btn-group").style = "none";
            document.getElementById("btn-group2").style = "block";
        } else {
            document.getElementById("btn-group").style = "block";
            document.getElementById("btn-group2").style = "none";
        }
    });
}
function botcheck() {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "quick-contact-form-botcheckbox";
    checkbox.value = "1";
    var div = document.getElementById("captcha");
    div.appendChild(checkbox);
    checkbox.checked = false;
}
function getReport(rptName) {
    var rptframe = 'rptframe';
    iframe = document.getElementById(rptframe);
    if (iframe !== null) {
        iframe.parentNode.removeChild(iframe);
    }
    switch (rptName) {
        case "ByMonth":
            var m = document.getElementById("month");
            var month = m.options[m.selectedIndex].value;
            var y = document.getElementById('year');
            var year = y.options[y.selectedIndex].value;
            var s = document.getElementById('status');
            var status = s.options[s.selectedIndex].text;
            var p = document.getElementById('products');
            var product = p.options[p.selectedIndex].value;
            var link = "../functions/customreports.aspx?rpt=" + rptName + "&m=" + month + "&y=" + year + "&s=" + status + "&p=" + product;
            break;
        case "OutofDate":
            var p = document.getElementById('1products');
            var product = p.options[p.selectedIndex].value;
            var link = "../functions/customreports.aspx?rpt=" + rptName + "&p=" + product;
            break;
    }
    var iframe = document.createElement("iframe");
    iframe.frameBorder = 0;
    iframe.width = "100%";
    iframe.height = "750px";
    iframe.id = "rptframe";
    iframe.setAttribute("src", link);
    document.getElementById("rpt-view").appendChild(iframe);
}
function validateEmail() {
    email = document.getElementById("useremail").value;
    $.ajax({
        type: "POST",
        url: "functions/customfunctions.aspx",
        data: { ctype: "vemail", cval: email }
    }).done(function (msg) {
        resp = parseFloat(cleanRet(msg,1));
        if (resp < 1) {
            document.getElementById("Emailcheck").value = email;
            document.getElementById("formemail").innerHTML = "<label for='useremail'>Verify Email<small>*</small></label><input id='useremail' class='required email input-block-level error' type='text' value='' equalto='#Emailcheck' name='useremail'><label class='error' for='vemail' generated='true'>Email address already exists.</label>";
        } else {
            document.getElementById("formemail").innerHTML = "<label for='useremail'>Verify Email<small>*</small></label><input id='useremail' class='required email input-block-level' type='text' value='' equalto='#Emailcheck' name='useremail'>";
            document.getElementById("Emailcheck").value = "";
        }
   });
}
function cleanRet(ret, typ) {
    if (typ === 1){
        ret = ret.replace('<span id="lbl1">', '');
        ret = ret.replace('</span>\r\n', '');
    }else{
        ret = ret.replace('<!DOCTYPEhtml><div id="panel1">','');
        ret = ret.replace('</div>','');
    }
    return ret;
}
function getFiles(itms) {
    if (chkcnt === 0) {
        if ($("#registration-form").valid()) {
            var itmarr = itms.split(",");
            var urlstr = "";
            var remitm = "";
            for (var i = 0; i < itmarr.length; i++) {
                if (itmarr[i] === "1") {
                    urlstr = urlstr + "downloads/app.exe,";
                } else if (itmarr[i] === "2") {
                    urlstr = urlstr + "http://website.com/UniversalDownloads/programname/application.exe";
                } else {
                    remitm = remitm + itmarr[i] + ",";
                }
            }
            downloads(urlstr.split(","));
            if (chkcnt === 0) {
                completeChkout(itms);
                chkcnt = 1;
            }        
        }
    }    
}
function downloads(urls) {
    for (var i = 0; i < urls.length; i++) {
        var hiddenIFrameID = 'hiddendownloader'+i;
        iframe = document.getElementById(hiddenIFrameID);
        if (iframe === null) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        if(urls[i]!==""){
            iframe.src = urls[i];
        }
    }
}
function completeChkout(itms) {
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var useremail = $("#useremail").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var region = $("#region").val();
    var zip = $("#zip").val();
    var telephone = $("#telephone").val();
    var ref = $("#referral").val();
    $.ajax({
        type: "POST",
        url: "functions/customfunctions.aspx",
        data: { ctype: "completechkout", items: itms, first: firstname, last: lastname, email: useremail, addy: address, cit: city, reg: region, code: zip, phone: telephone, referral: ref}
    }).done(function (msg) {
        if (cleanRet(msg, 1) === "OK") {
            document.getElementById("register-form").innerHTML = "Thank You!<br />We will be in contact with you shortly.";
            document.getElementById("modal-footer").innerHTML = "<button class='btn' onclick='donechk()'>Close</button>";
        }
    });
}
function GetShipPrice() {
    var e = document.getElementById("shipping");
    var strPrice = "$" + e.options[e.selectedIndex].value + ".00";
    var elMyElement = document.getElementByID('<%= lblShippingPrice %>');
    elMyElement.innerHTML = strPrice;
}
function DisplayDiv() {
    document.getElementById("CustomerHidden").style.display = "block";
    document.getElementById("LabelHidden").style.display = "none";
}
function donechk() {
    location.reload();
}
function DivSwitch() {
    document.getElementById("LabelHidden").style.display = "block";
    document.getElementById("CustomerHidden").style.display = "none";
}
function HideAll() {
    document.getElementById("CustomerHidden").style.display = "none";
    document.getElementById("LabelHidden").style.display = "none";
}
function CustomerEnterEvent(e,val) {
   if (e.keyCode === 13) {
        DivSwitch();
    }
}