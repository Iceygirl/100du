/*
	**
	原生javascript实现
	**
*/

window.onload = function (){
	mx.app.menuTab();
	mx.app.update();
	mx.app.tab();
	mx.app.picRotate();
	mx.app.calendar();
	mx.app.bbs();
	mx.app.hotList();
};

var mx = {};

mx.tools = {};
mx.tools.getByClass = function (oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b'+sClass+'\\b');
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className.search(re) != -1){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};

mx.ui = {};
mx.ui.showTip = function (obj,str){
	obj.onfocus = function (){
		if(obj.value == str){
			obj.value = '';
		}
	}
	
	obj.onblur = function (){
		if(obj.value == ''){
			obj.value = str;
		}
	}
};

mx.ui.move = function (obj,old,now){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function (){
		var iSpeed = (now-old)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed): Math.floor(iSpeed);
		if(old == now){
			clearInterval(obj.timer);
		} else {
			old += iSpeed;
			obj.style.top = old + 'px';
		}
	},30);
	
	
};

mx.app = {};
mx.app.menuTab = function (){
	var oUl = document.getElementById('menu');
	var aLi = oUl.getElementsByTagName('li');
	var oTxt1 = document.getElementById('txt1');
	var oTxt2 = document.getElementById('txt2');
	
	var arr = ["例如：荷棠鱼坊烤鱼 或 樱花日本料理",
			   "例如：金城商场18号 或 光山路",
			   "例如：优惠券1 或 优惠券2",
			   "例如：全文1 或 全文2",
			   "例如：视频1 或 视频2"
	];
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		
		aLi[i].onclick = function (){
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = 'gradient';
			}
			
			this.className = 'active';
			oTxt1.value = arr[this.index];
			
			mx.ui.showTip(oTxt1, arr[this.index]);
		}
	}
	
	mx.ui.showTip(oTxt1, arr[0]);
	mx.ui.showTip(oTxt2, '输入关键字');
};

mx.app.update = function (){
	var oDiv = document.getElementById('update');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');

	var oUp = mx.tools.getByClass(oDiv,'triangle_up')[0];
	var oDown = mx.tools.getByClass(oDiv,'triangle_down_red')[0];
	var iNow = 0;	
	var str = '';
	
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
	oUl.innerHTML = str;
	
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.height = aLi[0].offsetHeight*aLi.length + 'px';
	var timer = null;
	
	timer = setInterval(auto,1000);
	
    function auto(){
		if(iNow == aLi.length/2){
			iNow = 0;
			oUl.style.top = 0;
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetHeight,-(iNow+1)*aLi[0].offsetHeight);
		iNow++;
	};
	
	function autoPrev(){
		if(iNow == 0){
			iNow = aLi.length/2;
			oUl.style.top = -oUl.offsetHeight/2 + 'px';
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetHeight,-(iNow-1)*aLi[0].offsetHeight);
		iNow--;
	};
	
	oUp.onclick = auto;
	
	oDown.onclick = autoPrev;
	
	oDiv.onmouseover = function (){
		clearInterval(timer);
	};
	
	oDiv.onmouseout = function (){
		timer = setInterval(auto,1000);
	};
};

mx.app.tab = function (){
	var tabNav1 = mx.tools.getByClass(document,'tabNav1')[0];
	var aCon1 = mx.tools.getByClass(document,'tabCon1');
	var tabNav2 = mx.tools.getByClass(document,'tabNav2')[0];
	var aCon2 = mx.tools.getByClass(document,'tabCon2');
	var tabNav3 = mx.tools.getByClass(document,'tabNav3')[0];
	var aCon3 = mx.tools.getByClass(document,'tabCon3');
	var tabNav4 = mx.tools.getByClass(document,'tabNav4')[0];
	var aCon4 = mx.tools.getByClass(document,'tabCon4');
	
	fnTab(tabNav1,aCon1,'onclick');
	fnTab(tabNav2,aCon2,'onmouseover');
	fnTab(tabNav3,aCon3,'onmouseover');
	fnTab(tabNav4,aCon4,'onclick');
	
	function fnTab(oNav,aCon,sEvent){
		var aElem = oNav.children;
		var aA = oNav.getElementsByTagName('a');
		
		for(var i=0;i<aCon.length;i++){
			aCon[i].style.display = 'none';
		}
		
		aCon[0].style.display = 'block';
		
		for(var i=0;i<aElem.length;i++){
			aElem[i].index = i;
			
			aElem[i][sEvent]=function (){
				
				for(var i=0;i<aElem.length;i++){
					aElem[i].className = 'gradient';
				}
				
				this.className = 'active';
					
				for(var i=0;i<aA.length;i++){
					aA[i].className = 'triangle_down_gray';
				}
				
				aA[this.index].className = 'triangle_down_red';
				
				for(var i=0;i<aCon.length;i++){
					aCon[i].style.display = 'none';
				}
				aCon[this.index].style.display = 'block';
			}
		}
	}
};

mx.app.picRotate = function (){
	var oDiv = document.getElementById('picRotate');
	var oImgDiv = mx.tools.getByClass(oDiv,'img')[0];
	var oImg = oImgDiv.getElementsByTagName('img')[0];
	var oP = oDiv.getElementsByTagName('p')[0];
	
	var oOl = oDiv.getElementsByTagName('ol')[0];
	var aLi = oOl.getElementsByTagName('li');
	
	var json = {
		'picArr':
				['img/content/focal_area_pic1.png',			  'img/content/focal_area_pic2.png','img/content/focal_area_pic3.png'],
		'txtArr':
				['爸爸去哪里~','星星~','月亮~']
		};
	
	var timer = null;
	var iNow = 0;
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		
		aLi[i].onclick = function (){
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
			}
			
			this.className = 'active';
			oImg.src = json.picArr[this.index];
			oP.innerHTML = json.txtArr[this.index];
		}
	}
	
	timer = setInterval(auto,1500);
	
	function auto (){	
		for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
		}
		
		aLi[iNow].className = 'active';
		oImg.src = json.picArr[iNow];
		oP.innerHTML = json.txtArr[iNow];
		iNow++;
		iNow %= json.picArr.length;
	}
	
	oDiv.onmouseover = function (){
		clearInterval(timer);
	};
	
	oDiv.onmouseout = function (){
		timer = setInterval(auto,1500);
	};
};

mx.app.calendar = function (){
	var oDiv = document.getElementById('calendar');
	var oOl = oDiv.getElementsByTagName('ol')[0];
	var aLi = oOl.getElementsByTagName('li');
	var oH3 = oDiv.getElementsByTagName('h3')[0];
	var aSpan = oH3.getElementsByTagName('span');
	
	var oTip = mx.tools.getByClass(oDiv,'today_info')[0];
	var oImg = oTip.getElementsByTagName('img')[0];
	var oStrong = oTip.getElementsByTagName('strong')[0];
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
	
		aLi[i].onmouseover = function (){
			
			
			/*这里存在问题
			for(var i=0;i<aLi.length;i++){
				aLi[i].getElementsByTagName('img')[0].className = '';
			}*/
			
			this.getElementsByTagName('img')[0].style.display = 'block';
			oImg.src = this.children[0].src;
			oStrong.innerHTML = aSpan[this.index%aSpan.length].innerHTML;
			oTip.style.top = this.offsetTop -30 + 'px';
			oTip.style.left = this.offsetLeft + 50 + 'px';
			oTip.style.display = 'block';
		};
		
		aLi[i].onmouseout = function (){
			this.getElementsByTagName('img')[0].style.display = 'none';
			oTip.style.display = 'none';
		};
	}
	
};

mx.app.bbs = function (){
	var oDiv = document.getElementById('bbs');
	var oOl = oDiv.getElementsByTagName('ol')[0];
	var aLi = oOl.getElementsByTagName('li');
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover = function (){
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
			}
			
			this.className = 'active';
		}
	}
};

mx.app.hotList = function (){
	var oDiv = document.getElementById('hotArea');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	var arr = ['',
			'用户1<br/>人气1',
			'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124987',
			'用户3<br/>人气3',
			'用户4<br/>人气4',
			'用户5<br/>人气5',
			'用户6<br/>人气6',
			'用户7<br/>人气7',
			'用户8<br/>人气8',
			'用户9<br/>人气9',
			'用户10<br/>人气10'];
	
	for(var i=0;i<aLi.length;i++){
		
		var oP = document.createElement('p');
		oP.innerHTML = arr[i];
		aLi[i].appendChild(oP);
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover = function (){
			this.getElementsByTagName('p')[0].style.display = 'block';
		}
		aLi[i].onmouseout = function (){
			this.getElementsByTagName('p')[0].style.display = 'none';
		}
	}
}