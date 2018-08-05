###	如何创建一个js库/插件
***	
##	要把避免的问题：内存泄漏 变量污染
#####	处理方案：函数 对象 自执行函数 闭包
1.	对象： 将全局变量升级为对象的属性this.str  方法prototype.func  存入到一个对象内 ，占一个变量
2.	函数： 将变量 方法放入一个方法内进行使用 外部传入参数即可，占一个函数
3.	自执行函数： ()()不向外部泄漏 但是也不能获取到内部的值
	处理方法：(1)将要获取的值赋值给window全局的一个属性，不方便访问多个函数、变量，需要根据访问内容给window定义多个,
				
				(function(){
					var zzz= 'xxx';
					function test(){
						return zzz;
					};
					window.test = test;//赋值到全局
				})();
				test();//直接调用
				可以定义一个返回的json对象来解决，给全局赋值此对象即可
				(function(){
					var zzz= 'xxx';
					function test(){
						return zzz;
					};
					var allObj = {//定义一个返回对象
						zzz:zzz,
						test : test
					}
					window.$ = allObj;//赋值到全局
				})();
				$.test(); test();//调用
				
			 (2)将要获取的值赋值给任意一个全局的一个属性，使其变成全局变量的属性
			   (function(window,$){
					var zzz= 'xxx';
					function test(){
						return zzz;
					};
					var allObj = {//定义一个返回对象
						zzz:zzz,
						test : test
					}
					$.allObj = allObj;//赋值到全局
				})();
				$.test();//调用 $不能省略
				升级 传参 将window作为参数 可以提高性能 减少作用于查询链条长度
				(function($){//这里的$是形参传入的是下边的 window
					var zzz= 'xxx';
					function test(){
						return zzz;
					};
					var allObj = {//定义一个返回对象
						zzz:zzz,
						test : test
					}
					$.allObj = allObj;//赋值到全局
				})(window);//这里的window实参
				$.test();//调用 $不能省略
			 （3）return 闭包
			 	var test = (function(){
					var zzz= 'xxx';
					return {
						function func(){
							return zzz;
						};
					}
				})();
				test.func();
4.	命名空间：通过创建一个简单对象字面量来打包所有的相关函数和变量，模拟命名空间的作用 解决变量污染，隔离代码
	var NameSpace = window.NameSpace || {};
	NameSpace.Hello = new function() {
	  var self = this;
	  var name = 'world';
	  self.sayHello = function(_name) {
	    return 'Hello ' + (_name || name);
	  };
	};
	
	调用
	 NameSpace.Hello.sayHello();
***	
###	链式访问
	在对象内部方法的最后添加一个return this；返回当前对象 ，当前对象内就会有这些方法可以进行调用，这时使用链式调用时即可