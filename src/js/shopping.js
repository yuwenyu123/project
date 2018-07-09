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

            //把加入到数据库的商品显示在页面
            http.get('./../api/shopping.php',{
                // dataType:'json',
            }).then(function(data){
                show(data); 
            });



            //删除商品
            // console.log($('.y_del'));
            $('.tboy').on('click','.y_del',function(){
                var $tr = $(this).closest('tr');
                let $id = $tr.attr('data-id');
                // $('.tboy').html('');
                http.get('./../api/delete.php',{
                    type:'yu',
                    id:$id
                }).then(function(data){
                    $tr.remove();
                    $('.aa').text($('tr').length);
                    var money=0;
                    for(let i=0;i<$('.tboy5').length;i++){
                        money += ($('.tboy5')[i].innerText.slice(1))*1;
                    }
                    $('.dd').text('￥'+money);
                    if($('tr').length==0){
                        $('.aa').text('0');
                        $('.ee').text('-￥0.00');
                        $('.dd').text('0');
                    }
                })
            })

            //清空购物车
            $('.a2').on('click',function(){
                http.get('./../api/delete.php',{
                    type:'quan'
                }).then(function(data){
                    $('.tboy').remove();
                    $('.aa').text('0');
                    $('.ee').text('-￥0.00');
                    $('.dd').text('0');
                })
            })

            //点击增加
            $('.tboy').on('click','#btn_2',function(){
                var $tr = $(this).closest('tr');
                let $id = $tr.attr('data-id');
                http.get('./../api/change.php',{
                    id:$id,
                    type:'zeng'
                }).then(function(data){
                    $('.tboy').html('');
                    show(data);
                })
            })

            //点击减少
            $('.tboy').on('click','#btn_1',function(){
                var $tr = $(this).closest('tr');
                let $id = $tr.attr('data-id');
                if($(this).next().val()>1){
                    http.get('./../api/change.php',{
                        id:$id,
                        type:'jian'
                    }).then(function(data){
                        $('.tboy').html('');
                        show(data);
                    })
                }
            })


            $('.a4').click(function(){
                location.href='../index.html';
            })

            function show(data){
                data = JSON.parse(data);
                let res = data.map(function(item){
                    return`
                            <tr data-id="${item.id}">
                                <td class="tboy1">${item.node.slice(5)}</td>
                                <td class="tboy2">${item.name.slice(5)}</td>
                                <td class="tboy3">${item.price}</td>
                                <td class="tboy4">
                                    <input type="button" id='btn_1' value='-' />
                                    <input type="text" id='qty_1' value='${item.qty}' />
                                    <input type="button" id='btn_2' value='+' /></td>
                                <td class="tboy5">￥${item.price.slice(1)*item.qty}</td>
                                <td class="tboy6"><a href="javascript:" class='y_del'>删除</a></td>
                            </tr>`
                }).join('');                   
                $('.tboy').append(res);
                //商品数量
                $('.aa').text(data.length);
                //商品总额
                var money=0;
                for(let i=0;i<$('.tboy5').length;i++){
                    money += ($('.tboy5')[i].innerText.slice(1))*1;
                }
                $('.dd').text('￥'+money);
            }
        })
    })
})