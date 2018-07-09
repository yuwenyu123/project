require(['config'],function(){
    require(['jquery','http'],function($,http){
        $(function($){
            $('#head-box').load('./head.html');
            $('#bottom-box').load('./bottom.html');
            $('#foot-box').load('./foot.html');

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

            //数据生成商品列表
            var list = $('.ul-list0')[0];
            var page = $('.page-turning')[0];
            let pageNo = 1;
            let qty = 12;
            function getajax(){
                http.get('./../api/list.php',{
                    pageNo:pageNo,
                    qty:qty
                }).then(function(data){
                    var total = JSON.parse(data).total;
                    var data = JSON.parse(data).data;
                    list.innerHTML = data.map(function(item,idx){
                        return `<a href="javascript:">
                                    <li data-id="${item.index}">
                                            <img src="${item.imgurl}" />
                                            <p class="p1">${item.name}</p>
                                            <p class="p2">大药房价：<span class="active">￥${item.cost}</span></p>
                                    </li>
                                </a>` 
                   }).join('');

                    //分页效果
                    let pageQty = Math.ceil(total/qty);
                    let span3 = document.createElement('span');
                    let span4 = document.createElement('span');
                    page.innerHTML='';
                    span3.innerText ='首页';
                    span4.innerText ='上一页';
                    page.appendChild(span3);
                    page.appendChild(span4);
                    // page.innerHTML = '';
                    for(let i = 1;i<=pageQty;i++){
                        let span = document.createElement('span');
                        span.innerText = i;
                        if(i==pageNo){
                            span.className = 'active';
                        }
                        page.appendChild(span);   
                    }
                    let span1 = document.createElement('span');
                    let span2 = document.createElement('span');
                    span1.innerText ='下一页';
                    span2.innerText ='末页';
                    page.appendChild(span1);
                    page.appendChild(span2);
                    var num = $('.page-turning span').length-4;
                    $('.num').text('共' + num + '页');
                    $('#pageIndexs').val(pageNo);
                })
            }
            getajax();
            //点击分页高亮
            $('.page-turning').on('click','span',function(){
                if($(this).text()>0){
                    pageNo = $(this).text();
                    getajax();    
                }
            })
            //跳转首页
            $('.page-turning').on('click','span',function(){
                if($(this).text()=='首页'){
                    pageNo = 1;
                    getajax();    
                }
            })
            //跳转末页
            $('.page-turning').on('click','span',function(){
                if($(this).text()=='末页'){
                    var num = $('.page-turning span').length-4;
                    pageNo = num;
                    getajax();    
                }
            })
            //上一页
            $('.page-turning').on('click','span',function(){
                if($(this).text()=='上一页'){
                    if(pageNo==1){
                        pageNo=2;
                    }
                    pageNo = pageNo-1;
                    getajax();    
                }
            })
            //下一页
            $('.page-turning').on('click','span',function(){
                if($(this).text()=='下一页'){
                    var num = $('.page-turning span').length-4;
                    pageNo = ++pageNo;
                    getajax();    
                    if(pageNo>=num+1){
                        pageNo=pageNo-1;
                    }
                }
            })
            //跳转第几页
            $('#queding').on('click',function(){
                pageNo = $('#pageIndexs').val();
                getajax();  
            })
            

            //点击传送ID,跳转详情页
            $('.ul-list0').on('click','li',function(){
                var sp = $(this).attr('data-id');
                location.href = './details.html?id=' + sp;   
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