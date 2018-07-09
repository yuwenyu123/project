require(['config'],function(){
    require(['jquery','http','gdszoom'],function($,http,magnifying){
        $(function($){
            $('#head-box').load('./head.html');
            $('#bottom-box').load('./bottom.html');
            $('#foot-box').load('./foot.html');

            // 放大镜
            magnifying.initialize($('.main_img'))
            // 鼠标进入
            $('.main_img').mouseenter(function(e) {
                e=e.target
                if(!e.src){
                    // 鼠标在父对象边框进入的情况
                    // src将获取不到
                    e=$('img',e)[0] 
                }
                    magnifying.into(e.src)
            });
            // 鼠标离开
            $('.main_img').mouseleave(function(e) {
                magnifying.leave()
            });
            // 鼠标移动
            $('.main_img').mousemove(function(e) {
                magnifying.mover(e)
            });

            
            $('.smallList').on('mouseover','img',function(){
                $('.main_img img').attr({
                    src:this.src,
                    'data-big':this.dataset.big || this.src
                })
            });


            //数据参数获取显示在详情页
            var params = location.search;
            params=params.slice(4);
            // console.log(params);
            http.get('./../api/details.php',{
                id:params
            }).then(function(data){
                var data = JSON.parse(data)[0];
                $('.pro_name').text(data.describe);
                $('.pro_func').text(data.describe1);
                $('<li class="li1"></li>').text('通用名称：'+data.name).appendTo('.introduc');
                $('<li class="li2"></li>').text('商品编号：'+data.goods_id).appendTo('.introduc');
                $('<li class="li3"></li>').text('商品规格：'+data.goods_size).appendTo('.introduc');
                $('<li class="li4"></li>').text('批准文号：'+data.wish).appendTo('.introduc');
                $('<li class="li5"></li>').text('生产企业：'+data.store).appendTo('.introduc');
                $('<li class="li6"></li>').text(data.imgurl).appendTo('.introduc');
                $('.li6').css({'display':'none'});
                $('.pro_mall_price').text('￥'+data.cost);
                $('.Pro_NotRushWord2').text('￥'+(data.price-data.cost).toFixed(2));
                $('.del').text('￥'+data.price);
                $('.price1').text(data.cost);
                $('.price2').text((data.price-data.cost).toFixed(2));
                $('.m_img')[0].src = data.imgurl;
                $('.m_imgs')[0].src = data.imgurl;
                $('.m_img').attr('data-big',data.imgurl);
            })


            //点击增加数量
            $('.y_btn2').on('click',function(){
                
                let qty = $('#y_qty').val()*1;
                
                qty += 1;
                $('#y_qty').val(qty);

            })
            //点击减少数量
            $('.y_btn1').on('click',function(){
                
                let qty = $('#y_qty').val()*1;
                if(qty==1){
                    qty=2;
                }
                
                qty -= 1;
                $('#y_qty').val(qty);

            })
            //点击加入购物车
            $('.btn').on('click',function(){
                //飞入购物车
                var fei = $('.m_img')[0].cloneNode(true);
                document.body.appendChild(fei);
                fei.style.position='absolute';
                fei.style.left='317px';
                fei.style.top='279px';
                fei.style.width='310px';
                var timer = setInterval(function(){
                    var width = parseFloat(fei.style.width)-35;
                    if(width<=0){
                        width=0;
                    }
                    var top = parseFloat(fei.style.top)-10;
                    var left = parseFloat(fei.style.left)+100;
                    // left
                    if(left>=1082){
                        left=1082;
                    }
                    if(top<=179){
                        top=179;
                    }       
                    fei.style.width=width+'px';
                    fei.style.left=left+'px';
                    fei.style.top=top+'px';
                },30)




                let qty = $('#y_qty').val()*1;
                http.get('./../api/addshopping.php',{
                    id:params,
                    node:$('.li2').text(),
                    name:$('.li1').text(),
                    price:$('.pro_mall_price').text(),
                    imgurl:$('.li6').text(),
                    dataType:'json',
                    qty:qty
                }).then(function(data){
                    //购物车数量
                    http.get('./../api/shopping.php',{}).then(function(data){
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
                            $('.calcu').append('<a href="./shopping.html">去购物车结算</a>')
                            $('.goodslist')[0].innerHTML+=data.map(function(item){
                                return `<li>
                                        <p><img src="../${item.imgurl.slice(3)}"/></p>
                                        <p>${item.name}</p>
                                        <p>${item.price}x${item.qty}</p>
                                    </li>`
                            }).join('');
                        }
                    })
                })

            })

            //login登录名字
            http.get('./../api/loginname.php',{}).then(function(data){
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
            http.get('./../api/shopping.php',{}).then(function(data){
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
                    $('.calcu').append('<a href="./shopping.html">去购物车结算</a>')
                    $('.goodslist')[0].innerHTML+=data.map(function(item){
                        return `<li>
                                <p><img src="../${item.imgurl.slice(3)}"/></p>
                                <p>${item.name}</p>
                                <p>${item.price}x${item.qty}</p>
                            </li>`
                    }).join('');
                }
            })
        })
    })
})