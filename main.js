'use strict';		// Cade's

$(document).ready(function(){
	$('#start').click(init);
	
});

function init() {
	drawDiscs();
	//wire up events - user clicks tower, select top disc
  $('.tower').click(towerClicked);
}

function drawDiscs() {
	$('.discBag').empty();
	$('.tower').css('padding-left',0);
	$('.tower').css('padding-right',0);

	$('#discno').prop('disabled',true);//lock input box
	var n = $('#discno').val();

  if (n>7) {
  	$('.tower').css('padding-left',(n-7)*10+'px');//set min width of tower higher
  	$('.tower').css('padding-right',(n-7)*10+'px');
  }

	var minsize = 30 - 5*(n>7?n-7:0); //30%
	var startOffset = 33 + 5*(n>7?n-7:0);
	while (n>0) {
		var disc = $('<div>');
		disc.addClass('disc');
		disc.attr('id',n);
		disc.css('margin-left',(startOffset - 5*(n-1))+'%'); //depending on disc #, size changes
		disc.css('width',(minsize + 10*(n-1))+'%');
		disc.css('background-color','#'+Math.floor(Math.random()*16*16*16).toString(16));
		disc.text(n);
		$('#left').find('.discBag').prepend(disc); //tower->discBag->disc
		n--;	
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
