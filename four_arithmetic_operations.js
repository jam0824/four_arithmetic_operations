
var ANSWER = 10;

function main(list_num){
  var arrs = permutation(list_num, list_num.length);

  return_value = "";

  //順列総当たり
  for(var i = 0; i < arrs.length; i++){
    return_value += calc(arrs[i]);
  }
  //戻り値が空なら結果なし
  if(return_value == ""){
    return "10になる計算方法はありません。";
  }
  else{
    return return_value;
  }
}

//四則演算総当たり
function calc(list_permutation){
  return_formulas = "";
  var list_operators = ['+', '-', '*', '/'];
  for(var i = 0; i < list_operators.length; i++){
    for(var j = 0; j < list_operators.length; j++){
      for(var k = 0; k < list_operators.length; k++){
        list_use_operators = [list_operators[i], list_operators[j], list_operators[k]];
        return_formulas += normal_formula(list_permutation, list_use_operators);
        return_formulas += parentheses_formula(list_permutation, list_use_operators);
        return_formulas += double_parentheses_formula(list_permutation, list_use_operators);
      }
    }
  }
  return return_formulas;
}

//カッコなしの通常の数式生成
function normal_formula(list_permutation, list_operators){
  return_formulas = "";
  formula = "";
  for(var i = 0; i < list_operators.length; i++){
    formula += list_permutation[i] + list_operators[i];
  }
  formula += list_permutation[list_permutation.length - 1];
  var x = exec_formula(formula);
  if(x == ANSWER){
    return_formulas += make_str_answer(formula, x, return_formulas);
  }
  return return_formulas;
}

//カッコの全パターン生成
function parentheses_formula(list_permutation, list_operators){
  return_formulas = "";
  for(var i = 0; i < list_operators.length; i++){
    var l_parentheses = ['','','',''];
    var r_parentheses = ['','','',''];
    l_parentheses[i] = '(';
    for(var j = i + 1; j < list_permutation.length; j++){
      r_parentheses = ['','','',''];
      r_parentheses[j] = ')';
      formula = "";
      for(var k = 0; k < list_operators.length; k++){
        formula += l_parentheses[k] + list_permutation[k] + r_parentheses[k] + list_operators[k];
      }
      formula += list_permutation[list_permutation.length - 1] + r_parentheses[r_parentheses.length - 1];

      var x = exec_formula(formula);
      if(x == ANSWER){
        return_formulas += make_str_answer(formula, x, return_formulas);
      }

    }
  }
  return return_formulas;
}

//カッコが複数パターン
function double_parentheses_formula(list_permutation, list_operators){
  var l_parentheses = ['(','','(',''];
  var r_parentheses = ['',')','',')'];
  return_formulas = "";
  formula = "";
  for(var i = 0; i < list_operators.length; i++){
    formula += l_parentheses[i] + list_permutation[i] + r_parentheses[i] + list_operators[i];
  }
  formula += list_permutation[list_permutation.length - 1] + r_parentheses[r_parentheses.length - 1];
  
  var x = exec_formula(formula);
  if(x == ANSWER){
    return_formulas = make_str_answer(formula, x, return_formulas);
  }
  return return_formulas;
}

//数式実行
function exec_formula(formula){
  var x = eval(formula);
  return x;
}

//出力数式の整形
function make_str_answer(formula, x, all_formula){
  if(formula.includes('(')){
    conv_formula = formula.replace(/\(/g,'');
    conv_formula = conv_formula.replace(/\)/g,'');
    var y = exec_formula(conv_formula);
    if(y == ANSWER){
      return '';
    }

  }
  return formula + "=" + x + "\n";
}

//順列の配列を用意
function permutation(list_num, nukitorisu){
  var arrs, i, j, all_num, results, parts;
  arrs = [];
  all_num = list_num.length;
  if(all_num < nukitorisu){
    return;
  }
  else if(nukitorisu == 1){
    for(i = 0; i < all_num; i++){
      arrs[i] = [list_num[i]];
    }
  }
  else{
    for(i = 0; i < all_num; i++){
      parts = list_num.slice(0);
      parts.splice(i, 1)[0];
      results = permutation(parts, nukitorisu - 1);
      for(j = 0; j < results.length; j++){
        arrs.push([list_num[i]].concat(results[j]));
      }
    }
  }
  return arrs;
}