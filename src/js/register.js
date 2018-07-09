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

           //随机生成验证码
            let arr = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let str ="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g";
            let color = str.split(",");
            $('.reflashyz')[0].onclick=function(){
                $('.reflashyz')[0].innerText = pan();
                $('.reflashyz')[0].style.backgroundColor=bac();
            }
            $('.reflashzc')[0].onclick=function(){
                $('.reflashyz')[0].innerText = pan();
                $('.reflashyz')[0].style.backgroundColor=bac();
            }
            $('.reflashyz')[0].innerText = pan();
            $('.reflashyz')[0].style.backgroundColor=bac()
            function pan(){
                var res = '';
                for(var i=0;i<4;i++){
                    var idx = parseInt(Math.random()*arr.length);
                    res+=arr[idx];
                }
                return res;
            }
            function bac(){
                let str1="#";
                for(let i=0;i<6;i++){
                    str1+=color[parseInt(Math.random()*15)];
                }
                return str1;
            }


            //检测用户名
            $('#u_username').on('blur',function(){
                let _username = $('#u_username').val();
                http.post('./../api/register.php', {
                    username: $('#u_username').val().trim(),
                    password: $('#u_password').val().trim(),
                }).then(function(res){
                    if(res=='false'){
                        $('.register-tishi').css({'color':'red'});
                        $('.register-tishi').text('用户名不正确');
                    }else{
                        $('.register-tishi').css({'color':'green'});
                        $('.register-tishi').text('(用户名可使用)');
                    }
                })
            })

            //点击检查注册信息
            $('.reg').on('click',function(){
                 //判断账户密码是否为空
                if($('#u_username')[0].value ==''&& $('#u_password')[0].value==''){
                    alert('账号密码不能为空');
                    $('#u_username').focus();
                    return false;
                }

                var reg = /^[a-z][\da-z\-]{5,19}$/gi;
                if(!reg.test($('#u_username').val())){
                     alert('账号必须以字母开头,长度6-20,以字母开头');
                    $('#u_username').focus();
                    return false;
                }
                if(!$('#u_password').val()){
                    $('#u_password').focus();
                    alert('请输入密码');
                    return false;
                }
                if(!/^[a-z0-9\-]{5,16}$/.test($('#u_password').val())){
                    alert('请输入6-16位密码'); 
                    return false;
                }
                if($('#u_password').val() !== $('#u_password1').val()){
                    alert('请输入一样的密码');
                    return false;
                }
                if(!/^[\w\-]{3,}@[a-z0-9\-]{2,63}(\.[a-z]{2,6})+$/i.test($('#u_email').val())){
                    alert('请输入正确的邮箱');
                    return false;
                }

                $('.an').css({display:'block'});
                http.post('./../api/register.php',{
                    username:$('#u_username').val(),
                    password:$('#u_password').val(),
                    email:$('#u_email').val(),
                    type:'reg'
                }).then(function(data){
                    if(data ==='success'){
                        $('.an').css({display:'none'});
                        location.href = './login.html';
                    }else{
                        alert('注册失败');
                    }
                }).catch(function(data){
                    $('.an').css({display:'none'});
                })
                  
            })

            //遮罩层
            $('<div class="an"></div>').appendTo('body');
        })
    })
})