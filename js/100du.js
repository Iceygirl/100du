/*
  **
  jquery实现
  **
*/

$(function (){
	
	(function (){
		var aLi = $('#menu li');
		var oTxt = $('#txt1');
		var arr = ["例如：荷棠鱼坊烤鱼 或 樱花日本料理",
			   "例如：金城商场18号 或 光山路",
			   "例如：优惠券1 或 优惠券2",
			   "例如：全文1 或 全文2",
			   "例如：视频1 或 视频2"
		];
		var iNow = 0;
		
		aLi.each(function(index){
			$(this).click(function (){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow = index;
				oTxt.val(arr[iNow]);
				
				toTip(oTxt,arr[iNow]);
			});
		});
		
		toTip(oTxt,arr[iNow]);
		toTip($('#txt2'),'输入关键字');
		
		function toTip (obj,str){
			obj.focus(function (){
			if($(this).val() == str){
				$(this).val('');
			}
		});
		
			obj.blur(function (){
				if($(this).val() == ''){
					$(this).val(str);
				}
			});
		}
		
		
	})();
	
	(function (){
		var oUp = $('#update .triangle_up');
		var oDown = $('#update .triangle_down_red');
		var oUl = $('#update ul');
		var iH = 0;
		var iNow = 0;
		var str = '';
		var timer = null;
		
		var arr = [
			{'name':'彤彤','time':'6','title':'那些灿烂华美的瞬间…'},
			{'name':'轩轩','time':'7','title':'明朝那些事儿…'},
			{'name':'aa','time':'8','title':'那些灿烂华美的瞬间…'},
			{'name':'bb','time':'9','title':'那些灿烂华美的瞬间…'},
			{'name':'cc','time':'10','title':'那些灿烂华美的瞬间…'},
			{'name':'cc','time':'11','title':'那些灿烂华美的瞬间…'},
			{'name':'dd','time':'12','title':'那些灿烂华美的瞬间…'}
		];
		
		for(var i=0;i<arr.length;i++){
			str += '<li><a href="#"><strong>'+arr[i].name+'</strong><span> '+arr[i].time+'分钟前</span> 写了一篇新文章：'+arr[i].title+'…</a></li>';
		}
		oUl.html(str);
		iH = oUl.find('li').height();
		
		oUp.click(function (){
			doMove(-1);
		});
		
		oDown.click(function (){
			doMove(1);
		});
		
		function auto(){
			timer = setInterval(function (){
				doMove(-1);
			},2000);
		}
		auto();
		
		$('#update').hover(function (){
			clearInterval(timer);
		},auto);
		
		function doMove(num){
			iNow+=num;
			if ( Math.abs(iNow) > arr.length-1){
				iNow = 0;
			}
			if ( iNow > 0 ) {
				iNow = -(arr.length-1);
			}
			oUl.stop().animate({'top':iH*iNow},1000,'linear');
		}
	})();
	
	(function(){
		var aLi = $('#calendar li').not('.normal');
		var oTip = $('.today_info');
		var aSpan = $('#calendar h3 span');
		
		aLi.mouseover(function (){
			aLi.find('img').css('display','none');
			$(this).find('img').css('display','block');
			
			var str1 = $(this).find('img').attr('src');
			oTip.find('.img').find('img').attr('src',str1);
			
			var str2 = aSpan.eq($(this).index()%aSpan.length).html();
			oTip.find('strong').html(str2);
			
			oTip.offset({left:$(this).offset().left + 50,
						 top:$(this).offset().top -20});
			oTip.css('display','block');
			
		});
		
	})();
	
	(function (){
		var aLi = $('#picRotate ol li');
		var arr = ['爸爸去哪里~','月亮~','星星~'];
		var iNow =0;
		var timer = null;
		
		aLi.click(function (){
			aLi.attr('class','');
			$(this).attr('class','active');
			
			var str = $(this).find('img').attr('src')
			$('#picRotate .img').find('img').attr('src',str);
			$('#picRotate p').html(arr[$(this).index()]);
			
		});
		
		function auto (){
			aLi.attr('class','');
			aLi.eq(iNow).attr('class','active');
			
			var str = aLi.eq(iNow).find('img').attr('src')
			$('#picRotate .img').find('img').attr('src',str);
			$('#picRotate p').html(arr[iNow]);
			iNow ++;
			iNow%=arr.length;
		}
		
		$(document).ready(function (){
			timer = setInterval(auto,1000);
		});
		
		$('#picRotate').mouseover(function(){
			clearInterval(timer);
		});
		
		$('#picRotate').mouseout(function (){
			timer = setInterval(auto,1000);
		});
	})();
	
	(function (){
		
		fnTab($('.tabNav1'),$('.tabCon1'),'click');
		fnTab($('.tabNav2'),$('.tabCon2'),'mouseover');
		fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
		fnTab($('.tabNav4'),$('.tabCon4'),'click');
		
		function fnTab(oNav,aCon,sEvent){
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent,function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					
					aElem.find('a').removeClass('triangle_down_red').addClass('triangle_down_gray');
					$(this).find('a').removeClass('triangle_down_gray').addClass('triangle_down_red');
					
					aCon.hide().eq(index).show();
				});
			});
		};
	})();
	
	(function (){
		var aLi = $('#bbs ol li');
		aLi.each(function(){
			$(this).mouseover(function (){
				aLi.attr('class','');
				$(this).attr('class','active')
			});
		});
	})();
	
	(function (){
		var aLi = $('#hotArea ul li');
		var arr = [
			'',
			'用户1<br/>人气1',
			'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124987',
			'用户3<br/>人气3',
			'用户4<br/>人气4',
			'用户5<br/>人气5',
			'用户6<br/>人气6',
			'用户7<br/>人气7',
			'用户8<br/>人气8',
			'用户9<br/>人气9',
			'用户10<br/>人气10'
		];
		
		$.each(arr,function(i,val){
			aLi.eq(i).append('<p>'+val+'</p>');
		});
		
		aLi.each(function (){
			$(this).mouseover(function (){
				$(this).find('p').css('display','block');
			});
			$(this).mouseout(function (){
				$(this).find('p').css('display','none');
			});
		});
	})();
});