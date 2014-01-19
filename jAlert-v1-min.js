/* 
	jAlert v.1
	Made with love by Versatility Werks (http://flwebsites.biz)
	MIT Licensed
*/

$('body').append("<div id='jAlertBack'></div>");$jAlertBack=$('#jAlertBack');function anyAlertsVisible(){var visible=false;$('.jAlertWrap').each(function(){if($(this).is(":visible")){visible=true;return;}});return visible;}
function closeAlert(alert,remove,onClose){if(alert=='all'){alert=$('.jAlertWrap');}
alert.hide('200');setTimeout(function(){if(remove){alert.remove();}
if(!anyAlertsVisible()){$jAlertBack.fadeOut('fast');if(typeof onClose=='function'){onClose();}}else if(typeof onClose=='function'){onClose();}},500);}
function showAlert(alert,overlap){if(!overlap){closeAlert($(getTopMost('.jAlertWrap')),false);}
$jAlertBack.fadeIn('fast');alert.show('fast');}
function getTopMost(elem){var top=0,el;$(elem).each(function(){var offset=$(this).offset();if(offset.top>top){highest=offset.top;el=this;}});return el;}
function jAlert(title,message,url,iframeSrc,iframeHeight,classes,id,hideOnClick,closeBtn,onClose,onOpen){title=title||false;message=message||false;url=url||false;iframeSrc=iframeSrc||false;iframeHeight=iframeHeight||'600px';classes=classes||false;id=id||false;if(hideOnClick!==true){hideOnClick=false;}
closeBtn=true||false;if(typeof onClose!='function'){onClose=false;}
if(typeof onOpen!='function'){onOpen=false;}
function showjAlert(content){$jAlertBack.fadeIn('fast');var div="<div class='jAlertWrap'";var topMost=getTopMost('.jAlertWrap');if(typeof topMost!=='undefined'){var zIndex=parseInt(topMost.style.zIndex,10)+1;}else{zIndex=99999;}
div+=" style='z-index: "+zIndex+"'><div class='jAlert ";if(classes){div+=' '+classes;}
if(!title){div+=' noTitle';}
div+="'";if(classes){div+=" id='"+id+"'";}
div+="><div>";if(closeBtn){div+="<div class='closeAlert jClose'>X</div>";}
if(title){div+="<div class='jTitle'><div>"+title+"</div></div>";}
div+="<div class='jContent'>"+content+"</div></div></div></div>";$('html, body').animate({scrollTop:0},'slow');var div=$(div);div.appendTo('body');div.show('fast');if(closeBtn){div.find('.closeAlert').on('click',function(){closeAlert(div,true,onClose);});}
if(hideOnClick){$(document).one('mouseup',function(e){closeAlert(div,true,onClose);});}
div.find('.autofocus:first').focus();if(typeof onOpen=='function'){onOpen(div);}
return div;}
if(!message&&!url&&!iframeSrc){return showjAlert('jAlert content is empty.');}else if(url){$.get(url,function(data){return showjAlert(data);});}else if(iframeSrc){return showjAlert("<iframe style='border: 0px; height: "+iframeHeight+"; width: 100%;' src='"+iframeSrc+"'></iframe>");}else if(message){return showjAlert(message);}}
function staticAlert(title,message,classes,id,hideOnClick,closeBtn,onClose,onOpen){return jAlert(title,message,false,false,false,classes,id,hideOnClick,closeBtn,onClose,onOpen);}
function iframeAlert(title,iframeSrc,iframeHeight,classes,id,hideOnClick,closeBtn,onClose,onOpen){return jAlert(title,false,false,iframeSrc,iframeHeight,classes,id,hideOnClick,closeBtn,onClose,onOpen);}
function ajaxAlert(title,url,classes,id,hideOnClick,closeBtn,onClose,onOpen){return jAlert(title,false,url,false,false,classes,id,hideOnClick,closeBtn,onClose,onOpen);}
function alert(message){return staticAlert(false,message);}
function showPic(url,size){return staticAlert(false,"<div style='text-align: center;'><img src='"+url+"' style='max-width: 100%;'></div>",size,'',true);}