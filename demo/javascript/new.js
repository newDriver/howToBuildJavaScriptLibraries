;(function(){	
 //注册命名空间 'newjs' 到window对象上    
        window['newjs'] = {};  
        //选择器
		// id选择器
        function $id(idName){
        	var eles =document.getElementById(idName);
        	return eles;
        };	      
		window["newjs"]["$id"]=$id;		
		//class选择器
		function $class(className){
			var eles =document.getElementsByClassName(className);
        	return eles;
		};		
		window["newjs"]["$class"]=$class;
		
		//标签选择器
		
		function $tag(tagName){
			var eles =document.getElementsByTagName(tagName);
        	return eles;
		};
		
		window["newjs"]["$tag"]=$tag;
		
		//		 ajax 请求
 		function ajax(method,url,data,successCallBackFn,failCallBackFn){
         	if(window.XMLHttpRequest){
         		var xhr;
				xhr = new XMLHttpRequest;	
				}else{
				throw new Error("浏览器不支持，请安装正规应用市场下载的浏览器")
				};
			if(method == "GET" ||method == "get"){
				xhr.open(method,url+"?"+data+"&randomNum="+Math.random())
				xhr.send(null);
			}else if (method == "POST" ||method == "post"){
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.open(method,url);
				xhr.send(data);
			}else{
				throw new Error("请求方式不正确！");
			};
 		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 ){
					if( xhr.status == 200){							
						successCallBackFn(JSON.parse(xhr.responseText));
					}else{					
						failCallBackFn("请求失败");
					};
				};
			};
      } ;    
       
		 window['newjs']['ajax']=ajax; 
		 
		//手机系统判断部分
		var uSystem = navigator.userAgent, app = navigator.appVersion;
		//check is this an Android device
		function isAndroid(){
			if(uSystem.indexOf('Android') > -1 || uSystem.indexOf('Linux') > -1){
				return true;
			}else{
				return false;
			};			
		};
		window['newjs']['isAndroid']=isAndroid;  
		//check is this an IOS device		
		function isIOS(){
			if(!!uSystem.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				return true;
			}else{
				return false;
			};
		};
		
		window['newjs']['isIOS']=isIOS;
		
		//是否在 微信浏览器判断
   		// check dose this is in WeChat
		function isWeiXin(){
    		var ua = window.navigator.userAgent.toLowerCase();
    		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      			return true;
   			 }else{
     		   return false;
			  };
		};
		window['newjs']['isWeiXin']=isWeiXin;
		
		//识别屏幕大小
		function deviceWidth(){
			return document.documentElement.clientWidth;
		};
		window['newjs']['deviceWidth']=deviceWidth;
		
		//按UI图进行等比例放缩，自适应屏幕大小处理
		//参数 uiWidth设计图宽度像素数值 myPrimitiveFontSize 原始字体大小 
		//此放缩仅针对rem等比放缩 使用时CSS文件设置字体大小或者元素宽高时配合rem使用		
		
		function scalingByProportion(uiWidth,myPrimitiveFontSize){
			var selfAdaptionFontSize,deviceWidth;
			deviceWidth = document.documentElement.clientWidth;
			selfAdaptionFontSize = deviceWidth/uiWidth*myPrimitiveFontSize+"px";
			return document.documentElement.style.fontSize = selfAdaptionFontSize;			
		};
		
		window['newjs']['scalingByProportion']=scalingByProportion;

		//获取滚动高度
		function $scrollTop(){
			return document.documentElement.scrollTop||document.body.scrollTop; 
		};
		window['newjs']['$scrollTop']=$scrollTop;
		//获取可视窗口的宽度
		function $w(){
			return document.body.width||document.documentElement.width||window.innerWidth;
		};
		window['newjs']['$w']=$w;
		//获取可视窗口的高度
		function $h(){
			return document.body.height||document.documentElement.height||window.innerHeight;
		};
		window['newjs']['$h']=$h;

		//随机颜色
		function randomColor(){
			var r = parseInt(Math.random()*256);
			var g = parseInt(Math.random()*256);
			var b = parseInt(Math.random()*256);	
			return "rgb("+r+","+g+","+b+")";
		};
		window['newjs']['randomColor']=randomColor;
		//获取内部样式表 外部样式表中属性的属性值
		// obj-->元素节点
		// at--->属性名
		function getStyle(obj,at){
			if(obj.currentStyle){
				return obj.currentStyle[at];
			}else{
				return window.getComputedStyle(obj,null)[at];
			};
		};
		window['newjs']['getStyle']=getStyle;
		
		//弹层	展示	
		function  showShelter(isTouchToClose){	
			if($id("myShelter").length<0){
				createEle("div","myShelter",null,"body"); 
			}else{
				if($id("myShelter").style.display != "block"){
					$id("myShelter").style.display = "block";
					if($id("myShelter").className ==""||$id("myShelter").className=="shelterClosed"){
						$id("myShelter").className = "shelterShowed"
					};
				}else if(($id("myShelter").style.display == "block")&&(isTouchToClose==true)){
					$id("myShelter").ontouch = closeSheleter();
					$id("myShelter").onclick = closeSheleter();
				};
			};
		};
		window['newjs']['showShelter']=showShelter;
		//隐藏
		function closeSheleter(){
			$id("myShelter").style.display = "none";
			$id("myShelter").className = "shelterClosed"
		};
		window['newjs']['closeSheleter']=closeSheleter;
		//添加DOM元素
		function createEle(eleTagName,idName,className,parrentCode){
			var newEle = document.createElement(eleTagName);
			if(idName){
				newEle.setAttribute("id",idName)
			};
			if(className){
					newEle.setAttribute("class","myShelter") ;
			};
			document.parrentCode.appendChild(newEle);
		};
		window['newjs']['createEle']=createEle;
		
})(window);
