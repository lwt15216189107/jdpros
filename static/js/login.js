var btn = document.querySelector('.login button');
var ipt1 = document.querySelector('.login p input');
var ipt2 = document.querySelector('.login .pwd input');
var pwd = document.querySelector('.login .pwd');
var wrong = document.querySelector('.login form p img')
var eye = document.querySelector('.login .pwd img');
var erro = document.querySelector('.login .erro');
var ipt3 = document.querySelector('.login .bottom input');
var tick = document.querySelector('.login .tick');
var quik_btn = document.querySelector('.login .quik_btn');
// 点击眼睛显示隐藏
var count = 0;
eye.onclick = function () {
    count++;
    if (count % 2 == 1) {
        this.src = '../img/eye_open.png';
        ipt2.type = 'text';
    }
    else {
        this.src = '../img/eye_close.png';
        ipt2.type = 'password';
    }
}
// 聚焦显示清除
ipt1.onfocus = function () {
    wrong.style.opacity = '1';
    wrong.onclick = function () {
        ipt1.value = '';
    }
}
ipt2.onfocus = function () {
    pwd.children[3].style.opacity = '1';
    pwd.children[3].onclick = function () {
        ipt2.value = '';
    }
}
ipt1.onblur = function () {
    wrong.style.opacity = '0';
}
ipt2.onblur = function () {
    pwd.children[3].style.opacity = '0';
}
// 登录点击事件
btn.onclick = (event) => {
    event.preventDefault()
    let username =ipt1.value
    let password = ipt2.value
    const un = /^[0-9]{11}$/
    const pw = /^[a-z0-9A-Z_@-]{5,17}$/
    if (username == '') {
        erro.style.opacity = '1';
        erro.innerHTML = '输入的账号不能为空'
    } else {
        if (un.test(username)) {
            erro.innerHTML = '';
            // 判断密码是否为空
            if (password == '') {
                erro.style.opacity = '1';
                erro.innerHTML = '输入的密码不能为空'
            } else {
                // 判断密码格式
                if (pw.test(password)) {
                    erro.innerHTML = '账号密码符合'
                    erro.style.opacity = '0';
                    // 判断是否勾选协议
                    if (ipt3.checked) {
                        btn.className = 'btn2';
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/login',
                            data: {
                                username,
                                password
                            }
                        }).then((data) => {
                            // if (data.data == '登录成功') {
                            //     // localStorage.setItem('flag','1')
                            //     localStorage.setItem('token',response.data.token)
                            //     window.location.href = 'http://127.0.0.1:3000/html/index.html'
                            // }
                            if (data.data == '密码错误') {
                                erro.innerHTML = '密码错误'
                                erro.style.opacity = '1';
                            }
                            if (data.data == '账户不存在') {
                                erro.innerHTML = '账户不存在'
                                erro.style.opacity = '1';
                            }  
                             if(data.data.token){
                                // localStorage.setItem('flag','1')
                                localStorage.setItem('token',data.data.token)
                                window.location.href = 'http://127.0.0.1:3000/html/index.html'
                            }
                        })
                    } else {
                        btn.className = 'btn1';
                        tick.style.animation = 'exhibit 3s forwards';
                        setTimeout(function () {
                            tick.style.animation = '';
                        }, 3000)
                    }
                }
                else {
                    erro.style.opacity = '1';
                    erro.innerHTML = '输入的密码应为6到18位'
                }
            }
        } else {
            erro.style.opacity = '1';
            erro.innerHTML = '输入的账号应该为11位数'
        }
    }
}
// 勾选点击事件
ipt3.onclick = function () {
    if (ipt3.checked && ipt1 != '' && ipt2 != '') {
        btn.className = 'btn2';
    } else {
        btn.className = 'btn1';
    }
}
ipt1.onkeyup = function () {
    ipt1L = ipt1.length;
    ipt2L = ipt2.length;
    if (ipt3.checked && 2 <= ipt1L && ipt1L <= 18 && 6 <= ipt2L && ipt2L <= 16) {
        btn.className = 'btn2';
    } else {
        btn.className = 'btn1';
    }
}
ipt2.onkeyup = function () {
    ipt1L = ipt1.length;
    ipt2L = ipt2.length;
    if (ipt3.checked && 2 <= ipt1L && ipt1L <= 18 && 6 <= ipt2L && ipt2L <= 16) {
        btn.className = 'btn2';
    } else {
        btn.className = 'btn1';
    }
}
// 点击快速注册
quik_btn.children[1].onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/rej.html'
}