var register = document.querySelector('.register');
var mask = document.querySelector('.register .mask');
// 选择是否同意,然后进行下一步
var disagree = document.querySelector('.register .disagree');
var agree = document.querySelector('.register .agree');
agree.onclick = function () {
    mask.style.display = 'none';
    register.style.display = 'block';
    form.style.display = 'block';
    btn.style.display = 'block';
    scusse.style.display = 'none';
}
disagree.onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/login.html'
}
var ipt1 = document.querySelector('.register form p input'); //注册里p的ipt
var ipt2 = document.querySelector('.register form .pwd input'); //注册里pwd的ipt
var btn = document.querySelector('.register button');    //下一步
var wrong1 = document.querySelector('.register form p img');  //注册里p的叉
var wrong2 = document.querySelector('.register form .pwd img:last-child');  //注册里pwd的叉
var form = document.querySelector('.register form');
var scusse = document.querySelector('.register .scusse');
var eye1 = document.querySelector('.register form .pwd img:nth-child(2)');  //注册里pwd的叉
var word = document.querySelector('.register form .word');
//  聚焦显示清除（注册事件 ）
ipt1.onfocus = function () {
    wrong1.style.opacity = '1';
    wrong1.onclick = function () {
        ipt1.value = '';
    }
}
ipt1.onblur = function () {
    wrong1.style.opacity = '0';
}
ipt2.onfocus = function () {
    wrong2.style.opacity = '1';
    wrong2.onclick = function () {
        ipt2.value = '';
    }
}
ipt2.onblur = function () {
    wrong2.style.opacity = '0';
}
// 点击眼睛显示隐藏(注册)
var count1 = 0;
eye1.onclick = function () {
    count1++;
    if (count1 % 2 == 1) {
        this.src = '../img/eye_open.png';
        ipt2.type = 'text';
    }
    else {
        this.src = '../img/eye_close.png';
        ipt2.type = 'password';
    }
}
// 判断是否是11位的号码
var ipt1L = null, ipt2L = null;
var flag = 0;
btn.onclick = (event) => {
    let username = ipt1.value
    let password = ipt2.value
    event.preventDefault()
    const un = /^[0-9]{11}$/
    const pw = /^[a-z0-9A-Z_@-]{5,17}$/
    if (username == '') {
        word.style.opacity = '1';
        word.innerHTML = '输入的账号不能为空'
    } else {
        if (un.test(username)) {
            word.style.opacity = '1';
            word.innerHTML = '';
            if (password == '') {
                word.style.opacity = '1';
                word.innerHTML = '输入的密码不能为空'
            } else {
                if (pw.test(password)) {
                    word.style.opacity = '0';
                    word.innerHTML = '密码符号长度';
                    // btn.className = 'btn2';
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3000/rej',
                        data: {
                            username,
                            password
                        }
                    }).then((data) => {
                        if (data.data == '注册成功') {
                            word.style.opacity = '1';
                            word.innerHTML = '注册成功'
                            form.style.display = 'none';
                            btn.style.display = 'none';
                            scusse.style.display = 'block';
                            // setTimeout(function () {
                            //     window.location.href = 'http://127.0.0.1:3000/html/login.html'
                            // }, 3000)
                        }
                        if (data.data == '注册失败，已有账号') {
                            word.style.opacity = '1';
                            word.innerHTML = '注册失败，已有账号'
                        }
                    })
                }
                else {
                    word.innerHTML = '输入的密码长度应为6-18位'
                }
            }
        } else {
            word.style.opacity = '1';
            word.innerHTML = '输入的账号长度应为11位'
        }
    }

}
ipt1.onkeyup = function () {
    let username = ipt1.value
    let password = ipt2.value
    const un = /^[0-9]{11}$/
    const pw = /^[a-z0-9A-Z_@-]{6,17}$/
    if (un.test(username) && pw.test(password)) {
        btn.className = 'btn2';
        word.style.opacity = '0';
        word.innerHTML = '密码符号长度';
    }
    else {
        btn.className = 'btn1'
    }
}
ipt2.onkeyup = function () {
    let username = ipt1.value
    let password = ipt2.value
    const un = /^[0-9]{11}$/
    const pw = /^[a-z0-9A-Z_@-]{6,17}$/
    if (un.test(username) && pw.test(password)) {
        btn.className = 'btn2';
        word.style.opacity = '0';
        word.innerHTML = '密码符号长度';
    }
    else {
        btn.className = 'btn1'
    }
}
// 注册成功点击跳转登录页面
var sbtn = document.querySelector('.register .scusse button');

sbtn.onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/login.html'
 
}
// 点击返回
var revert = document.querySelector('.register p i');
revert.onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/login.html'
}