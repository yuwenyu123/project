require(['config'],function(){
    require(['jquery','gscarousel','gscarousel_small','http'],function($,ca,small,http){
        $(function($){
            // $('#head-box').load('./html/head.html');
            // $('#bottom-box').load('./html/bottom.html');
            // $('#foot-box').load('./html/foot.html');

            //移入移出购物车字体图标
            $('.main-nav-right').on('mouseover',function(){
                $('.main-nav-right-arror').prop('class','fa fa-caret-down main-nav-right-arror');
            });
            $('.main-nav-right').on('mouseout',function(){
                $('.main-nav-right-arror').prop('class','fa fa-caret-right main-nav-right-arror');
            })

            //轮播图
            // console.log($);
            $('.main-content-banner-top').gsCarousel({
                imgs:['img/banner_1.jpg','img/banner_2.jpg','img/banner_3.jpg'],
            }).show();


            //特价倒计时
            showTime();
            var timer = setInterval(showTime,1000);
            function showTime(){
                var countDown = document.querySelector('.Countdown');
                var target = '2018-7-15 00:00:00';
                var offset = Date.parse(target) - Date.now();
                offset = parseInt(offset/1000);
                if(offset<=0){
                    clearInterval(timer);
                    $('.Countdown').hide();
                }
                var day = parseInt(offset/60/60/24);
                var hours = parseInt(offset/60/60)%24;
                var minutes = parseInt(offset/60)%60;
                var seconds = parseInt(offset)%60;
                hours = hours < 10 ? '0'+hours : hours;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seconds = seconds < 10? '0'+seconds : seconds;
                countDown.innerHTML= `<span>还剩</span>
                    <span class='active'>${day}</span>
                    <span>天</span>
                    <span class='active'>${hours}</span>
                    <span>时</span>
                    <span class='active'>${minutes}</span>
                    <span>分</span>
                    <span class='active'>${seconds}</span>
                    <span>秒</span>
                    <span>结束</span>`;
            }

            //预告切换
            $('.forecast').on('mouseover',function(){
                $(this).text('返回')
                $(this).css({'padding-right':'25px','color':'#d91519','textDecoration':'underline'});
                $('.sale-bottom').hide();
            })
            $('.forecast').on('mouseout',function(){
                $(this).text('下期预告')
                $(this).css({'padding-right':'15px','color':'#000','textDecoration':'none'});
                $('.sale-bottom').show();
            })


            //公告切换
            for(let i=0;i<$('.notice-top li').length;i++){
                    $('.notice-top li')[i].onmouseover=function(){
                        for(let j=0;j<$('.notice-top li').length;j++){
                            if(i==j){
                                $('.notice-bottom')[0].children[i].style.display='block';  
                                $('.notice-top li')[i].style.borderTop='2px solid #d91519';
                                $('.notice-top li')[i].style.borderLeft='1px solid #ccc';
                                $('.notice-top li')[i].style.borderRight='1px solid #ccc';
                            }else{
                                $('.notice-bottom')[0].children[j].style.display='none';
                                $('.notice-top li')[j].style.border='1px solid #fff';
                                $('.notice-top li')[j].style.borderTop='2px solid #fff';
                            }
                        }
                    }
            }


            //商品列表小轮播图
            $('.slide_section_1').gsCarousel_small({
                imgs:['img/goods_1_2.jpg','img/goods_1_3.jpg'],
            }).show();
            $('.slide_section_2').gsCarousel_small({
                imgs:['img/goods_2_2.jpg','img/goods_2_2.jpg'],
            }).show();
            $('.slide_section_3').gsCarousel_small({
                imgs:['img/goods_3_2.jpg','img/goods_3_3.jpg'],
            }).show();
            $('.slide_section_4').gsCarousel_small({
                imgs:['img/goods_4_2.jpg','img/goods_4_3.jpg'],
            }).show();
            $('.slide_section_5').gsCarousel_small({
                imgs:['img/goods_5_2.jpg','img/goods_5_3.jpg'],
            }).show();
            $('.slide_section_6').gsCarousel_small({
                imgs:['img/goods_6_2.jpg','img/goods_6_3.jpg'],
            }).show();
            $('.slide_section_7').gsCarousel_small({
                imgs:['img/goods_7_2.jpg','img/goods_7_3.jpg'],
            }).show();
            $('.slide_section_8').gsCarousel_small({
                imgs:['img/goods_8_2.jpg','img/goods_8_2.jpg'],
            }).show();
            $('.slide_section_9').gsCarousel_small({
                imgs:['img/goods_9_2.jpg','img/goods_9_2.jpg'],
            }).show();
            $('.slide_section_10').gsCarousel_small({
                imgs:['img/goods_10_2.jpg','img/goods_10_2.jpg'],
            }).show();
            $('.slide_section_11').gsCarousel_small({
                imgs:['img/goods_11_2.jpg','img/goods_11_2.jpg'],
            }).show();
            $('.slide_section_12').gsCarousel_small({
                imgs:['img/goods_12_2.jpg','img/goods_12_2.jpg'],
            }).show();


            //底部公告栏切换
            for(let i=0;i<$('.tabs_r li').length;i++){
                $('.tabs_r li')[i].onmouseover=function(){
                    for(let j=0;j<$('.tab_conbox_r').length;j++){
                        if(i==j){
                            $('.tab_conbox_r')[i].style.display='block';
                            $('.tabs_r li')[i].style.borderTop='2px solid #d91519';
                            $('.tabs_r li')[i].style.borderLeft='1px solid #ccc';
                            $('.tabs_r li')[i].style.borderRight='1px solid #ccc';
                        }else{
                            $('.tab_conbox_r')[j].style.display='none';
                            $('.tabs_r li')[j].style.borderTop='2px solid #f5f5f5';
                            $('.tabs_r li')[j].style.borderLeft='1px solid #f5f5f5';
                            $('.tabs_r li')[j].style.borderRight='1px solid #f5f5f5';
                        }
                    }
                }
            }

            //返回顶部  
            window.onscroll=function(){
                var scrollY = window.scrollY;
                if(scrollY<=500){
                    $('.inreturntop').hide();
                }else{
                    $('.inreturntop').show();
                }
            }
            $('.inreturntop').on('click',function(){
                var timer = setInterval(showTime,30);
                function showTime(){
                    var scrollY = window.scrollY;
                    var speed = Math.ceil(scrollY/10);
                    scrollBy(0,-speed);
                    if(scrollY<=0||speed<5){
                        clearInterval(timer);
                        scrollTo(0,0);
                    }   
                }
            })


            $('.y_li1').click(function(){
                location.href='html/list.html'
            })
            $('.y_li2').click(function(){
                location.href='html/list.html'
            })

            //login登录名字
            http.get('./api/loginname.php',{}).then(function(data){
                if(data.length<50){
                    $('.login-box').html(`<span class="logoName">欢迎加入开心人！</span>
                        <span class='login'><a href='html/login.html'>${data}</a></span>
                        <span class='login tuichu'><a>退出</a></span>`);
                }else{
                    $('.login-box').html(`<span class="logoName">欢迎加入开心人！</span>
                        <span class='login'><a href='html/login.html'>登录</a></span>
                        <span class='login'><a href='html/register.html'>注册</a></span>`);
                }
            })
            $(document).on('mouseover','.tuichu',function(){
                this.onclick=function(){
                    $('.login-box').html(`<span class="logoName">欢迎加入开心人！</span>
                        <span class='login'><a href='html/login.html'>登录</a></span>
                        <span class='login'><a href='html/register.html'>注册</a></span>`);
                }
            })


            //购物车数量
            http.get('./api/shopping.php',{}).then(function(data){
                data=JSON.parse(data);
                $('.shu').text(data.length);
                $('.shu').css({color:'yellow',fontSize:'16px'});
                if(data.length>0){
                    var price=0;
                    for(let i=0;i<data.length;i++){
                        price += ((data[i].price.slice(1)*1)*(data[i].qty*1));
                    }
                    price='￥'+price.toFixed(2);
                    $('.main-nav-right-shopping').html('');
                    $('<h3>最新加入的商品</h3>').appendTo('.main-nav-right-shopping');
                    $('<ul class="goodslist"></ul>').appendTo('.main-nav-right-shopping');
                    $('<div class="calcu"></div>').appendTo('.main-nav-right-shopping');
                    $('.calcu').html(`<p>共<span>${data.length}</span>件商品 共计：<span>${price}</span></p>`);
                    $('.calcu').append('<a href="html/shopping.html">去购物车结算</a>')
                    $('.goodslist')[0].innerHTML+=data.map(function(item){
                        return `<li>
                                <p><img src="${item.imgurl.slice(3)}"/></p>
                                <p>${item.name}</p>
                                <p>${item.price}x${item.qty}</p>
                            </li>`
                    }).join('');
                }
            })
        })
    })
})