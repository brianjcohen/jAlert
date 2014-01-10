/* 
	jAlert v.1
	Made with love by Versatility Werks (http://flwebsites.biz)
	MIT Licensed
*/

/* Add the jConfirm background div and holder div (if not exists) */
$('body').append("<div id='jAlertBack'></div>");
/* Cache them */
$jAlertBack = $('#jAlertBack');

/* Helper function that determines whether or not to hide the background while closing an alert */
function anyAlertsVisible(){
	var visible = false;
	$('.jAlertWrap').each(function(){
		if($(this).is(":visible")){
			visible = true; return;
		}
	});
	return visible;
}

/* 
	Closes an alert that has been created 

	Input:
	alert: (dom object) - The jAlertWrap for the alert you'd like to show, usually you'll just use what was returned by creating an alert
	remove: (boolean) - Whether or not to remove it completely, or just hide it, defaults to hide
	onClose: (function || false) - Function to run onClose	
		
	To Use:
	**Create an alert first**
	var thisAlert = ajaxAlert('Your Website Mobilized', 'http://yourwebsite.com', '500px', 'sm', '', false, true, false);
	**Then use the returned dom element, or find it based on whatever ID you may have assigned it**
	closeAlert(thisAlert, true);	
	
*/
function closeAlert(alert, remove, onClose){
	if(alert == 'all'){
		alert = $('.jAlertWrap');
	}
	alert.hide('200'); 
	if(remove){
		alert.remove();
	}
	setTimeout(function(){
	if(!anyAlertsVisible()){
		$jAlertBack.fadeOut('fast');
		if(typeof onClose == 'function'){ onClose(); }
	}else if(typeof onClose == 'function'){ onClose(); }
	}, 500);
}

/* 
	Shows an alert that has already been created. 
	
	Input:
	alert: (dom object) - The jAlertWrap for the alert you'd like to show, usually you'll just use what was returned by creating an alert
	overlap: (boolean) - Whether or not to overlap other alerts, or hide all others before showing this one	
	
	To Use:
	**Create an alert first**
	var thisAlert = ajaxAlert('Your Website Mobilized', 'http://yourwebsite.com', '500px', 'sm', '', false, true, false);
	**Then use the returned dom element, or find it based on whatever ID you may have assigned it**
	showAlert(thisAlert, true);

*/
function showAlert(alert, overlap){
	if(!overlap){
		closeAlert($(getTopMost('.jAlertWrap')), false);
	}
	$jAlertBack.fadeIn('fast');
	alert.show('fast');
}


/* Helper function to get the top alert box */
function getTopMost(elem) {
    var top = 0, el;
    $(elem).each(function(){
        var offset = $(this).offset();
        if (offset.top > top) {
            highest = offset.top;
            el = this;
        }
    });
    return el;
}

/* The main jAlert function...You don't really need to touch this unless you want to */
function jAlert(title, message, url, iframeSrc, iframeHeight, classes, id, hideOnClick, closeBtn, onClose){
	/* Set defaults */
	title = title || false;
	message = message || false;
	url = url || false;
	iframeSrc = iframeSrc || false;
	iframeHeight = iframeHeight || '600px';
	classes = classes || false;
	id = id || false;
	if(hideOnClick !== true){ hideOnClick = false; }
	closeBtn = true || false;
	if(typeof onClose != 'function'){ onClose = false; }
	
	/* Show an alert */
	function showjAlert(content){
		$jAlertBack.fadeIn('fast');
		var div = "<div class='jAlertWrap'";
		var topMost = getTopMost('.jAlertWrap');
		if(typeof topMost !== 'undefined'){
		var zIndex = parseInt(topMost.style.zIndex, 10) + 1;
		}else{
			zIndex = 99999;
		}
		div += " style='z-index: "+zIndex+"'><div class='jAlert ";
		if(classes){ div += ' '+classes; }
		if(!title){ div += ' noTitle'; }
		div += "'";
		if(classes){ div += " id='"+id+"'"; }
		div += "><div>";
  		if(closeBtn){ div += "<div class='closeAlert jClose'>X</div>"; }
  		if(title){ div += "<div class='jTitle'><div>"+title+"</div></div>"; }
  		div += "<div class='jContent'>"+content+"</div></div></div></div>";
  		$('html, body').animate({ scrollTop: 0 }, 'slow');
	  	var div = $(div);
	  	div.appendTo('body');
	  	div.show('fast');
	  	if(closeBtn){
		  	div.find('.closeAlert').on('click', function(){
				closeAlert(div, false, onClose);
			});
		}
		if(hideOnClick){
			$(document).one('mouseup', function(e){
				closeAlert(div, false, onClose);
			}); 
		}
		div.find('.autofocus:first').focus();
		return div;
	}
	
	/* Show alert based on content type */
	if(!message && !url && !iframeSrc){
		return showjAlert('jAlert content is empty.');
	}else if(url){
		$.get(url, function(data){
			return showjAlert(data);
		});
	}else if(iframeSrc){
		return showjAlert("<iframe style='border: 0px; height: "+iframeHeight+"; width: 100%;' src='"+iframeSrc+"'></iframe>");
	}else if(message){
		return showjAlert(message);
	}
}

/*
	Shows an alert with a text/html from the javascript calling it 
	
	Input:
	title: (string) - Header/Title of the Alert
	message: (string) - Text/HTML to display in the content area of the alert
	classes: (string or false) - CSS classes to add to the jAlert div
	id: (string or false) - id to add to the jAlert div
	hideOnClick: (true or false) - Whether or not you want to hide the div when you click anywhere on the screen
	closeBtn: (true or false) - Whether or not to show a close button in the top right
	onClose: (function or false) - Function to run after the alert is closed by the user
	
	To Use:
	var thisAlert = staticAlert('Success!', 'Your message has been deleted.', 'sm', '', false, true, false);
	
	This will show a popup with the title "Success!", the message "your message has been deleted.", in a "sm"all alert, it won't have a special "id", it "won't close" when you click any random spot, it will show a "close button", and it doesn't have an "on close" callback function.
	
*/

function staticAlert(title, message, classes, id, hideOnClick, closeBtn, onClose){
	return jAlert(title, message, false, false, false, classes, id, hideOnClick, closeBtn, onClose);
}

/*
	Shows an alert with an iframe
	
	Input:
	title: (string) - Header/Title of the Alert
	iframeSrc: (string) - URL src of the iframe
	iframeHeight: (string) - Height in measurement of your choice (recommend '500px' or so)
	classes: (string or false) - CSS classes to add to the jAlert div
	id: (string or false) - id to add to the jAlert div
	hideOnClick: (true or false) - Whether or not you want to hide the div when you click anywhere on the screen
	closeBtn: (true or false) - Whether or not to show a close button in the top right
	onClose: (function or false) - Function to run after the alert is closed by the user
	
	To Use:
	var thisAlert = iframeAlert('Your Website Mobilized', 'http://yourwebsite.com', '500px', 'sm', '', false, true, false);
	
	This will show a popup with the title "Your Website Mobilized", the message will be an iframed version of "yourwebsite.com", in a "sm"all alert, it won't have a special "id", it "won't close" when you click any random spot, it will show a "close button", and it doesn't have an "on close" callback function.
	
*/

function iframeAlert(title, iframeSrc, iframeHeight, classes, id, hideOnClick, closeBtn, onClose){
	return jAlert(title, false, false, iframeSrc, iframeHeight, classes, id, hideOnClick, closeBtn, onClose);
}


/* 
	Shows an alert with content retreived via ajax
	
	Input:
	title: (string) - Header/Title of the Alert
	url: (string) - URL of the page to retrieve it's content (must be on the same server using a relative path)
	classes: (string or false) - CSS classes to add to the jAlert div
	id: (string or false) - id to add to the jAlert div
	hideOnClick: (true or false) - Whether or not you want to hide the div when you click anywhere on the screen
	closeBtn: (true or false) - Whether or not to show a close button in the top right
	onClose: (function or false) - Function to run after the alert is closed by the user
	
	
	To Use:
	var thisAlert = ajaxAlert('Sports Results', '/sports-results.php', 'lg', 'sportsResults', false, true);
*/
function ajaxAlert(title, url, classes, id, hideOnClick, closeBtn, onClose){
	return jAlert(title, false, url, false, false, classes, id, hideOnClick, closeBtn, onClose);
}

/* Replaces the default alert(), just specify a message */
function alert(message){
	return staticAlert(false, message);
}

/* Shows a Pic in a jAlert, just specify image url and size (sm, md, lg, full) */
function showPic(url, size){
	return staticAlert(false, "<div style='text-align: center;'><img src='"+url+"' style='max-width: 100%;'></div>", size, '', true);
}