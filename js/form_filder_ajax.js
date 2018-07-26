$(document).ready(function(){
	
	$('form.landing-form').submit(function(){
		
		// Collect client info from fields
		var name = $.trim($('input[type="text"].field-name').val());
		var email = $.trim($('input[type="text"].field-email').val());
		var phone = $.trim($('input[type="text"].field-phone').val());
		
		// Patterns
		var nameReg = /^[a-zA-Z ]+$/;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var PhoneReg = /^[0-9-+]+$/;
		
		// Reset input fields error class
		$('input[type="text"]').removeClass('error');
		
		// Form validation
		if(name.length < 2 || !nameReg.test(name)){
			$('input[type="text"].field-name').addClass('error');
			$('input[type="text"].field-name').val('');
			$('input[type="text"].field-name').attr('placeholder','* Valid full name is required!');
		} else if (email.length < 5 || !emailReg.test(email)) {
			$('input[type="text"].field-email').addClass('error');
			$('input[type="text"].field-email').val('');
			$('input[type="text"].field-email').attr('placeholder','* Valid email is required!');
		} else if(phone.length < 9 || !PhoneReg.test(phone)){
			$('input[type="text"].field-phone').addClass('error');
			$('input[type="text"].field-phone').val('');
			$('input[type="text"].field-phone').attr('placeholder','* Valid phone is required!');
		} else {
				
			// Open ajax call to save client details + send mail to customer
			$.ajax({
			  url: "form_DB.php",
			  type: "POST",
			  dataType: "html",
			  async: "false", 
			  data: {
						name:name,
						email:email,
						phone:phone
					},
			  beforeSend: function () {
			  	var messege = '<img src="images/loading.gif" border="0" style="width:70px;text-align:center;">';
			  	messege += '&nbsp;&nbsp;Sending... ';
			  	$('form.landing-form').html(messege);
	      },
			  success: function(response) {			
			    console.log(response);
			  	if(response == true){		  
			  	  		
  		  		setTimeout(function() {
  					$('div.qr-form').html('<label class="after-sent">Your details has been send!</label>');
  					}, 2000);	
										
			  	} else {

            $('div.qr-form').html('<label class="after-sent">Something went wrong, please try again later...</label>');

			  	}			  				  			  					  					  					  				  				  					  	
			  }	  
			});				
		}

		// Stop form submission
		return false;
	});	
});
