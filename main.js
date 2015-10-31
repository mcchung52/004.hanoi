'use strict';		// Cade's

$(document).ready(function(){
	$('#start').click(init);
	
});

function init() {
	$('.discBag').empty();
	var discNum = $('#discno').val();
	if (discNum>0) {
		$('#discno').prop('disabled',true);//lock input box
		drawDiscs(discNum);		
	}
	//wire up events - user clicks tower, select top disc
  $('.tower').click(towerClicked);
}

function drawDiscs(n) {
	var i=100;
	while (n>0) {
  	var disc = $('<div>');
		disc.addClass('disc');
		disc.attr('id',n);
		disc.css('background-color','#'+Math.floor(Math.random()*16*16*16).toString(16));
		disc.text(n);
		disc.css('width', i+'%');
		disc.css('margin-left', (100-i)/2+'%');
		$('#left').find('.discBag').prepend(disc); //tower->discBag->disc
		n--;
		i-=5;
	}
}

function towerClicked(event) {
	var $seldisc = $('.selected');
	if ($seldisc.length) {
		if ($seldisc.closest('.tower').attr('id') == $(this).attr('id')) {//is it here?
			//unselect
			$(this).find('.disc:first-child').removeClass('selected');
		}
		else {
			//otherwise, move here, BUT IF IT ALLOWS
			if ($(this).find('.disc').length==0) {//if no disc, move here
				$seldisc.removeClass('selected');
				$(this).find('.discBag').prepend($seldisc);
			}
			else {//if there's disc, check against top
				if (Number($(this).find('.disc:first-child').attr('id')) > Number($seldisc.attr('id'))) {
					$seldisc.removeClass('selected');
					$(this).find('.discBag').prepend($seldisc);
				}
			}
		}
	}
	else {
		if ($(this).find('.disc').length) {//selected here and there's disc
			//select top
			$(this).find('.disc:first-child').addClass('selected');
		}
	}
	//winning condition
	if ($('#right').find('.disc').length==$('#discno').val()) {
		alert('Solved!!');
		$('#discno').prop('disabled',false);//unlock input box
		$('#discno').focus();
		$('.discBag').empty();
	}
}
