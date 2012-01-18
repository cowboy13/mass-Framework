dom.define("test/attr","more/spec,attr",function(){
    var iframe =  dom("<iframe id='test_attr' style='display:none;width:0px;height:0px;' src='/test/attr.html' frameBorder=0  />").appendTo("body");//
    window.attrTestCall = function(){
        dom.addTestModule("属性操作模块-attr",{
            "dom.fn.attr":function(){
                var idoc  =  iframe.contents()[0];
                //shortcuts
                var get = function(ee){
                //  dom.log(ee.selector+"   :   "+ee.length)
                }
                var foo = dom('#foo',idoc),
                a = dom('#foo a',idoc),
                img = dom('#test-img',idoc),
                input = dom('#foo',idoc).find("input"),
                radio = dom('#test-radio',idoc),
                radio2 = dom('#test-radio2',idoc),
                button = dom('#foo button',idoc),
                label = dom('#foo label',idoc),
                td = dom('#test-table_td',idoc),
                select = dom('#test-select',idoc),
                select2 = dom('#test-select2',idoc),
                select3 = dom('#test-select3',idoc),
                opt = dom('#test-opt',idoc),
                div = dom('#test-div',idoc),
                opt2 = dom('#test-select',idoc).find("option").eq(1),
                area = dom('#foo textarea',idoc),
                disabledTest = dom("#test-20110810-disabled",idoc);
                //开始测试
                get(foo);
                get(a);
                get(img);
                get(input);
                get(radio);
                get(radio2);
                get(button);
                get(label);
                get(td);
                get(select);
                expect(input.length).log();
                expect(a.attr("no-exist")).eq(undefined,"测试自定义属性的获取")
                expect(input.attr("readonly")).eq("readonly","测试readonly的获取");
                
                expect(radio.attr('checked')).eq(undefined,"测试checked的获取");
                expect(input.attr( 'value')).eq('hello',"测试value的获取");
                expect(dom.type(a.attr("style"))).eq("String","测试获取的style特性是否为字符串");
                expect(opt.attr("selected")).eq("selected","测试布尔属性selected的attr获取");
                expect(opt.prop("selected")).eq(true,"测试布尔属性selected的prop获取");
                expect(a.attr( 'data-test')).eq('test',"测试data-test的获取");


                // ie7- 要用 className
                expect(label.attr('class')).eq('test',"测试class的获取");
                // ie7- 要用 htmlFor
                expect(label.attr( 'for')).eq('test-input',"测试for的获取");
                expect(a.attr('href')).eq("/dom_framework/","测试href的获取");

                expect(img.attr('src')).eq("./logo.png","测试src的获取");
                expect(td.prop('rowspan')).eq(td[0].rowSpan,"测试rowspan的prop获取");

                expect(td.attr("rowspan")).eq('2',"测试rowspan的attr获取");
                expect(a.attr('title')).eq('test',"测试title的获取");

                a.attr('data-set','test-xx');
                expect(a.attr('data-set')).eq('test-xx',"测试自定义属性data-set的attr获取");

                td.attr('style', 'color:blue;');
                function trimCssText(str) {
                    return (str || "").replace(/;|\s/g, "").toLowerCase();
                }
                expect(trimCssText(td.attr('style'))).eq('color:blue',"通过attr对style的赋值取值");

                // 测试 checked 的 setter
                var checkbox2 = dom('#test-20110810-checkbox',idoc);
                checkbox2.attr('checked', true);
                expect(checkbox2.attr( 'checked')).eq('checked',"通过attr对check的赋值取值");
                expect(checkbox2.prop( 'checked')).eq(true);
                checkbox2.removeAttr( 'checked');
                expect(checkbox2.attr( 'checked')).eq(undefined);
                expect(checkbox2.prop( 'checked')).eq(false);
                //不存在就返回undefined
                //测试disabled
                expect(disabledTest.attr( "disabled")).eq(undefined);
                expect(disabledTest.prop( "disabled")).eq(false);
                expect(disabledTest[0]["disabled"]).log();
                disabledTest.attr( "disabled", true);

                expect(disabledTest.attr( "disabled")).eq("disabled");
                expect(disabledTest.prop( "disabled")).eq(true);
                disabledTest.attr( "disabled", false);
          
                expect(disabledTest.attr( "disabled")).eq(undefined);
                //测试removeAttr
                label.attr( 'test-remove', 'xx');
                expect(label.attr('test-remove')).eq('xx');
                label.removeAttr('test-remove');
                expect(label.attr('test-remove')).eq(undefined);

                // style
                a.removeAttr( 'style');
                expect(a.attr("style")).eq(undefined);//凡是移除了就是没有显式设置属性，就是undefined

                // normal
                expect(input.val()).eq('hello');
                // area
                expect(area.val().length).eq(12,"测试取TEXTARE进行取值（val）");
                // option
                expect(opt.val()).eq('1');
                expect(opt2.val()).eq('2');

                expect(select.val()).eq('1');
                expect(select2.val()).eq('2');
                expect(select3.val()).same(['1','2']);
                //测试check
                expect(radio.val()).eq("on");
                expect(radio2.val()).eq("on");
            
                a.val('test');
                expect(a.val()).eq('test');
                a.removeAttr('value');
            
                // select set value
                select.val( '3');
                expect(select.val()).eq('3');
                // restore
                select.val( 0);
                select3.val(['2','3']);
                expect(select3.val()).same(['2','3']);

                //还原
                select3.val( ['1','2']);
                select.val( '1');
            
                div.text('hello, are you ok?');
                expect(div.text()).eq('hello, are you ok?');
       
                select.attr('tabindex', 1);
                expect(select.attr( "tabindex")).eq(1);

                select.removeAttr("tabindex");
                a = dom("<a/>");       
                expect(a.attr("tabindex")).eq(undefined);
                a = dom("<a href=# />"); 
                expect(a.attr("tabindex")).eq(0);
                a = dom("<a href=# tabindex=2 />");
                expect(a.attr("tabindex")).eq(2);
            
            
                var form = dom.tag("form xx='zz' action='http://www.taobao.com'  name='form_name'  title='form_title'  onsubmit='return false;'",
                    dom.tag("input name='xx' value='yy'"));
                form = dom(form+"")
                expect(form.attr("action")).eq("http://www.taobao.com");
                expect(form.attr( "onsubmit")).eq("return false;");
                expect(form.attr( "name")).eq("form_name");
                expect(form.attr( "title")).eq("form_title");
                expect(form.attr( "xx")).eq("zz");
            
                var button = dom("<button value='xxx'>zzzz</button>");
                expect(button.attr( "value")).eq("xxx","测试用attr对button标签取value值");
            
                var d = dom("<input type='checkbox' checked='checked'>");
                expect(d.prop( 'checked')).eq(true);
                // undefined property
                expect(d.prop( 'checked2')).eq(undefined);
                iframe.remove();
            }
        });
        
    }
    
    var iframe2 =  dom("<iframe id='test_attr' src='/test/attr2.html' style='display:none;width:0px;height:0px;' frameBorder=0  />").appendTo("body");//
    window.classNameTestCall = function(){
        dom.addTestModule("className API测试-attr",{
            "className":function(){
                var idoc  =  iframe2.contents()[0];
                var a = dom('#foo-class a',idoc);
                a[0].className =  'link link2\t' + 'link9 link3';
                expect(a.hasClass( 'link')).eq(true);
                expect(a.hasClass( 'link4')).eq(false);
           
                expect(a.hasClass( 'link9')).eq(true);
                a.addClass( 'link-added');
                expect(a.hasClass( 'link-added')).eq(true);
                a.addClass( '.cls-a cls-b');
                expect(a.hasClass( '.cls-a')).eq(true);
                expect(a.hasClass( 'cls-b')).eq(true);
         
        
                a[0].className = 'link link2 link3 link4 link5';

                a.removeClass( 'link');
                expect(a.hasClass( 'link')).eq(false);
                a.removeClass( 'link2 link4');
                a.removeClass( 'link3');
                expect(a[0].className).eq('link5');
  
                a[0].className = 'link link3';
                // oldCls 有的话替换
                a.replaceClass( 'link', 'link2');
  
                expect(a.hasClass( 'link')).eq(false);
                expect(a.hasClass( 'link2')).eq(true);

                // oldCls 没有的话，不添加!
                a.replaceClass('link4', 'link');

                expect(a[0].className).eq('link2 link3');


                a[0].className = 'link link2';

                a.toggleClass( 'link2');
                expect(a.hasClass( 'link2')).eq(false);

                a.toggleClass( 'link2');
                expect(a.hasClass( 'link2')).eq(true);
           
                iframe2.remove();
            }
        });
    }
});