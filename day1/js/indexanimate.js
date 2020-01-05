/*  
*	知识点：   
*  	this使用   
*  	DOM事件   
*  定时器   
*   
*  思路：   
*  （1）设置它左右移动   
*    		问题：传入数字为NAN??   
*    		解决：在页面中增加属性style：left:0   
*  （2）平滑移动（移动时间固定，每次移动的距离不一样）   
*    		问题：连续点击出现晃动？---设置标志位   
*       	出现空白页？？--- 第一张图片前加上最后一张，最后一张图片前加上第一张   
*               							在类list的标签中增加属性style：left:-520px;   
*              						 	设置无限滚动判断   
*  （3）设置小圆点   
*    		首先将所有的类置为空，当前类置为on   
*    		绑定小圆点和图片  
*    		绑定小圆点和左右箭头   
*    		设置定时器，鼠标划上去停止，移开自动轮播   
*/
// 控制属性
	var showInterval = 2000;	// 每个图片的展示时间+slideTime
	var slideTime = 400;			// 总的运动时间--一张图片要400ms播放完毕
	var stayTime = 10;				// 每个图片片段停留的时间
	var boxWidth = 960;
	var imgCount = 7;
//1.获取元素
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    for(var i = 0 ;i<buttons.length;i++) buttons[i].value  = i;	// 先给每个span标签赋值进行标记
   var prev = document.getElementById("prev");
    var next = document.getElementById("next");
	var flag = true;
    var index = 0;			// 当前图片对应的小圆点
    var timer1 = null;
    var timer2 = null;

 //2.设置函数元素左右移动（具有局限性，给定的distance必须在范围内）
    function move(MoveIndex)			// 运动控制函数，给出相对于图片框移动距离	假设每次固定为-520px
	{
		var moveTimes = slideTime/stayTime;		// 需要移动的次数，当前40次
		var distance = MoveIndex*boxWidth;	// 需要移动的距离
        var eachdistance = distance/moveTimes;		// 每次移动的距离，当前13px
        var nextPosition = parseInt(list.style.left)+distance;	// 当前应该移动到的位置
        flag = false;

        function eachMove()
		{
            if(distance<0&&parseInt(list.style.left)>nextPosition||distance>0&&parseInt(list.style.left)<nextPosition)	// 还没有移动到指定位置
			{
                list.style.left = parseInt(list.style.left) + eachdistance + 'px';
            }else{		// 移动到指定位置
                flag = true;
                clearInterval(timer1);								// 停止移动，等待下一次移动事件触发
                list.style.left = nextPosition + 'px';		// 避免出现意外情况
                // 无限滚动判断
                if(nextPosition == -(imgCount+1)*boxWidth)	list.style.left = -boxWidth+ 'px';	// 左侧留出一个盒子
				else if(nextPosition== 0)	list.style.left = -imgCount*boxWidth+ 'px';
		   }
        }
        timer1 = setInterval(eachMove,stayTime);
		/*	setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
			由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。
		*/
    }

//3.设置点击切换图片
	/*下一张图片*/
    next.onclick = function () {
        if(!flag) return;
        // 绑定箭头和小圆点
		index==imgCount-1?index=0:index++;
		move(-1);	// 移动一个索引
        showCircle();
    };
	/*上一张图片*/
    prev.onclick = function () {
        if(!flag) return;
        // 绑定箭头和小圆点
		index==0?index=imgCount-1:index--;
        move(1);
        showCircle();
    };

//4.设置小圆点的绑定
    function showCircle(){
        //将之前的小圆点样式清除
        for(var i = 0 ;i<buttons.length;i++)
            if (buttons[i].className == "on") {
                buttons[i].className = "";
                break;
            }
        buttons[index].className = "on";
    }

    // 实现点击小圆点，移动图片
    for(var i = 0 ;i<buttons.length;i++){		// 增加一个作用域，避免变量污染
		!function(){
			buttons[i].onclick = function(){
				//判断当前的value值是否和index相等
				if(this.value == index) return;
				//如果不相等
				var offset = this.value - index;
				move(-offset);
				index = this.value;
				showCircle();
			}
		}();
    }

//5.设置自动轮播
    timer2 = setInterval(next.onclick,showInterval);
    container.onmouseover = function(){
        clearInterval(timer2);
    };
    container.onmouseout = function(){
		clearInterval(timer2);
        timer2 = setInterval(next.onclick,showInterval);
    };