var username = document.getElementById("loginform-username");
var password = document.getElementById("loginform-password");
var verification = document.getElementById("loginform-verification");
var invalidHints = document.getElementsByClassName("invalid");
username.onblur = function(){
	if(username.value.trim()=="")
		showError(username,0,"用户名不能为空！");
	else if(!checkSpecialChar(username,username.value))
		showError(username,0,"不能包含特殊字符\"\'<>,.*?%=/\\");
	else
		invalidHints[0].style.display = "none";
}
password.onblur = function(){
	if(password.value.trim()=="")
		showError(password,1,"密码不能为空！");
	else
		invalidHints[1].style.display = "none";
}
verification.onblur = function(){
	if(verification.value.trim()=="")
		showError(verification,2,"验证码不能为空！");
	else
		invalidHints[1].style.display = "none";
}

function checkSpecialChar(obj,txt){
       var patrn=/[\"\'<>,.*?%=/\\]/;
       if(patrn.exec(txt)){
       	// alert("不能包含特殊字符\"\'<>,.*?%=/\\");
         obj.value="";
         return false;
       }
		return true;
}

function showError(inputbox,index,txt){
	inputbox.focus();
	inputbox.value="";
	invalidHints[index].style.display = "block";
	invalidHints[index].innerHTML=txt;	
}

function logincheck(){
	if(username.value.trim()!=null&&password.value.trim()!=null&&verification.value.trim()!=null)
		return true;
	return false;
}