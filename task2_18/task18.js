
var data = [];
var tem_data=[];
function init()
{
	var label_number = document.getElementsByClassName("laber_numbel");
	for(var i = 0 ; i <label_number.length; i++)
	{

		label_number[i].innerHTML = data[i] = parseInt(Math.random()*100);
		var helper = function()
		{
			var value_label = this.innerHTML;
			if (tem_data.indexOf(parseInt(value_label)) !== -1) 
			{
				tem_data = tem_data.filter(
					function(age)
					{
						return age != value_label;
					});
				document.getElementById('input_text').value = tem_data.toString();
			}
			else
			{
				alert("不存在该值");
			}
		};
		label_number[i].onclick = helper;
	}
}

function addEvent()
{
	var input = document.getElementsByTagName('input');
		input[1].onclick = function () {
			 tem_data = data;
			document.getElementById('input_text').value = tem_data.toString();
				};
}

init();
addEvent();

