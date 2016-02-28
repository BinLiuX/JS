window.onload = function () {
	//调用封装函数
	waterfall("con","box");
	//实现效果的一组数据，需要从后台获取
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	//页面滚动事件
	window.onscroll = function () {
		//对获取的数据进行遍历
		for (var i = 0; i < dataInt.data.length; i++) {
			//调用judeement函数
			if (judgement()) {
				//依次创建新的标签
				var newBox = document.createElement("div");
				newBox.className = "box";
				con.appendChild(newBox);
				var newPic = document.createElement("div");
				newPic.className = "pic";
				newBox.appendChild(newPic);
				var newImg = document.createElement("img");
				newImg.src = "images/" + dataInt.data[i].src;
				newPic.appendChild(newImg);
				//对新创建的div进行再次处理
				waterfall("con","box");
			}
		}	
	}
	//瀑布流布局的实现函数
	function waterfall(parent,box) {
		//把con和box之类都放到函数中，防止全局变量污染
		var con = document.getElementById(parent);
		var box = document.getElementsByClassName(box);
		var boxArr = [];
		//遍历初始界面的box数组
		for (var i = 0; i < box.length; i++) {
			//把第一行的6个div的高度添加到数组中
			if (i<6) {
				boxArr.push(box[i].offsetHeight);		
			} else {
				//超过第一行的开始进行绝对定位处理
				//利用apply函数绑定到boxArr数组并找出最小的一个高度
				var minH = Math.min.apply(this, boxArr);
				//利用indexOf查找该值得索引
				var index = boxArr.indexOf(minH);
				//对后续的div进行绝对定位
				box[i].style.position = "absolute";
				//因为要放到minH的下面，所以top值为下所示
				box[i].style.top = minH +"px";
				//同时对left的值进行设置
				box[i].style.left = box[index].offsetLeft + "px";
				//需要对boxArr内最小的值加上下面的DIV的高度
				boxArr[index] += box[i].offsetHeight;
			}
		}
	}
	//判断最后一个div的中间距离页面最上端的高度是否小于页面滑动的距离加上document的高度
	//并返回一个布尔值
	function judgement() {
		var con = document.getElementById("con");
		var box = document.getElementsByClassName("box");
		var lastBox = box[box.length-1].offsetTop 
			+ Math.floor(box[box.length-1].offsetHeight/2);
		//对滑动距离的兼容写法
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//对页面document高度的兼容写法
		var docuH = document.documentElement.clientHeight || document.body.clientHeight;
		return (lastBox<scrollTop+docuH)?true:false;//三元
	}
	//在学习的过程中主要有以下几点
	//一是对需求实现的分析，首先要总结出瀑布流所需要达到的效果
	//  主要是按照高度的变化进行填充和鼠标滚动时候添加新的元素。
	//  高度变化的话就要想到需要使用绝对定位进行处理，
	//  然后一步一步的分析如何判断放到那个下面。
	//  如何设定位置。然后还要考虑到设置了之后每一列高度的变化。
	//	其次对鼠标滚动添加，首先要确保是在滚动到一定高度后添加，
	//	其次实现添加需要用到创建新标签和添加新标签的方法。
	//	然后要对新添加的标签继续进行瀑布流处理；
	//	在调用的过程中发现如果不封装函数会造成代码十分混论，bug很多
	//	但是封装又经常无法自发的写出来，尚需要多写
	//	
	//	
	//二是对offsetHeight和clientWidth以及scrollTop这一类DOM对象属性有了更一步的认识；
	//	同时对遍历数组的逻辑还是有时候会绕一下。还是得加强逻辑思维练习。
	//	
}

