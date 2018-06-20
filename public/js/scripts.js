$(document).ready(function() {

	$('.btn, .radioopt label').click(function() {

		if($('#multisteps').valid()) {
			var curstep = $(this).closest('.multistepbox');

			if(curstep.hasClass('finalstep')) {
				window.location='thankyou';
			} 

			else {
				curstep.hide().next().show();
				var stepname = $(this).closest('.multistepbox');

				if(stepname.hasClass('step-1') || stepname.hasClass('step-2') || stepname.hasClass('step-5') || stepname.hasClass('step-8') || stepname.hasClass('step-11')) {
			    updateprogress();
				}
			}
		}
	});

}); // end document ready function


function updateprogress() {
	var actvdot = $('.stepdot.active');
	actvdot.addClass('done').removeClass('active').next().next().addClass('active');
}
