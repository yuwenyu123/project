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

            //遮罩层
            $('<div class="an"></div>').appendTo('body');

            $('.login-tj').on('click',function(){
                if($('#LoginUserName').val().trim() =='' || $('#LoginPassWord').val()==''){
                        alert('账号密码不能为空');
                        return;
                }else{
                    $('.an').css({display:'block'});
                    http.post('./../api/login.php',{
                        username:$('#LoginUserName').val(),
                        password:$('#LoginPassWord').val(),
                        type:'reg'
                    }).then(function(data){
                        console.log(data);
                        $('.an').css({display:'none'});
                        var data = window.eval('('+data+')');
                        if(data.status){
                            alert('登录成功');
                            location.href = '../index.html';
                        }else{
                           alert('请输入正确的账号和密码')
                        }
                    }).catch(function(data){
                        $('.an').css({display:'none'});
                    })
                    
                }
            })
        })
    })
})