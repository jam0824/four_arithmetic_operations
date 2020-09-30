
function start_calc(){
	var arr = [];
	for(var i = 0; i < 4; i++){
		var input_num = document.getElementById("input" + i).value;
		input_num = input_num.trim();
		if(input_num.length != 1){
			alert("0～9の数字でお願いします");
			return;
		}
		var r = input_num.match(/[0-9]/);
		if(r == null){
			alert("0～9の数字でお願いします");
			return;
		}
		arr.push(input_num);
	}
	console.log(arr);
	var return_value = main(arr);
	return_value = check_dup(return_value);
	document.getElementById("view").innerHTML = return_value;

}

//表示用に整形
function check_dup(text){
	return_value = "";
	var list_check = text.split('\n');
	for(var i = 0; i < list_check.length; i++){
		var is_flag = false;
		for(var j = i + 1; j < list_check.length; j++){
			if(list_check[i] == list_check[j]){
				is_flag = true;
				break;
			}
		}
		if(!is_flag) return_value += list_check[i] + "<br>";
	}
	return return_value;
}