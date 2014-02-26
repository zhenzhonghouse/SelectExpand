/*!
 * jQuery SelectExpand Plugin 1.0 beta
 *
 * 	Copyright 2014 wuxing qq:252629505 email:wuxing2722@qq.com
 *	https://github.com/zhenzhonghouse/SelectExpand/blob/master/README.md
 *	Released under the Apache2 license:
 *  https://github.com/zhenzhonghouse/SelectExpand/blob/master/LICENSE
 *
*/
 
(function($){
	$.extend($.fn,{
		SelectExpand:function(option){
			$(document).click(function(e) {		//当在文档空白处点击鼠标时隐藏下拉框
                	var elem=$(e.target);
					if($(".SelectExpand_s").is(":visible") && elem.attr("class")!="SelectExpand_i" && !elem.parent(".SelectExpand_s").size())
					{
						$('.SelectExpand_s').hide();
					}
            });
			//遍历所有选择器元素,支持按类等多元素初始化
			return this.each(function(index, element) {
                //检查select对象是否已经创建扩展对象
			 	var expand_obj = $.data( this, "SelectExpandObj" );
			  	if ( expand_obj ) {
				 	 return expand_obj;
			 	 }
			 	 var expand_obj=new $.SelectExpandClass(option,this);	//初始化select扩展类
			 	 $.data( this, "SelectExpandObj", expand_obj );			//保存类数据到select元素中
				 
            });
			  
		}
		
	});
	
	
}(jQuery));

//SelectExpandClass构造函数
$.SelectExpandClass = function( option, select ) {
	this.settings = $.extend( true, {}, $.SelectExpandClass.defaults, option );
	this.currSelect = select;
	this.currInput = null;
	this.init();
};

$.extend($.SelectExpandClass,{
	defaults:{
		select_size:6
	},
	prototype:{
		init:function(){		//类初始化相关操作
			this.createInput();
			$(this.currSelect).hide();
			$(this.currSelect).attr("size",this.settings.select_size);
			var elem_name=$(this.currSelect).attr("name");
			$(this.currSelect).attr("name","hide_"+elem_name);
			$(this.currInput).attr("name",elem_name);
			$(this.currSelect).bind("click",this.__bind(this.onSelectClick,this));
			$(this.currInput).bind("click",this.__bind(this.onInputClick,this));
		},
		__bind:function(fn,me){
			return function(){
				return fn.apply(me,arguments);
				};
		},
		createInput:function(){
			var input_obj=$('<input type="text" class="SelectExpand_i" />').css({"width":this.currSelect.offsetWidth-4}).insertBefore(this.currSelect);
			this.currInput=input_obj[0];
		},
		onSelectClick:function(evt){	//当select元素单击时的事件
			//var element=evt.srcElement||evt.target;
			$(this.currInput).val($(this.currSelect).find("option:selected").val());
			$(this.currSelect).hide();
		},
		onInputClick:function(evt){	//当input元素单击时的事件
			var scr_left=document.documentElement.scrollLeft| window.scrollX;
			var scr_top=document.documentElement.scrollTop| window.scrollY;
			var rect=this.currInput.getBoundingClientRect();
			var x= rect.left+scr_left;
       		var y =rect.top+scr_top+this.currInput.offsetHeight;
			$(this.currSelect).css({"left":x,"top":y});
			$(this.currSelect).addClass("SelectExpand_s");
			$(".SelectExpand_s:visible").hide();
			$(this.currSelect).show();
		}
	}
	
	
});
