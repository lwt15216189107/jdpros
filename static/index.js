var bgc = document.querySelector('.bgc');
var head = document.querySelector('.head');
var first_page = document.querySelector('.inners .first-page');
var goods = document.querySelector('.inners .goods');
var inners = document.querySelector('.inners');
var foot = document.querySelector('.foot');
var decoration = document.querySelector('.inners .decoration');
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
var hnavTop = null;
var ipt1L = null, ipt2L = null;
btn.addEventListener('click', function () {
    ipt1L = ipt1.value.length;
    ipt2L = ipt2.value.length;
    // 判断长度
    if (2 <= ipt1L && ipt1L <= 18 && 6 <= ipt2L && ipt2L <= 16) {
        if (ipt3.checked) {
            // btn.className = 'btn2';
            // 输入账号15216189107 密码 123456789登录成功
            if (ipt1.value == 15216189107 && ipt2.value == 123456789) {
                login.style.display = 'none';
                head.style.display = 'block';
                bgc.style.display = 'block';
                inners.style.display = 'block';
                foot.style.display = 'block';
                erro.style.opacity = '0';
                bodys.style.backgroundColor = '#f1f1f1'
                // 滚动事件
                hnavTop = hnav.offsetTop;
                window.onscroll = function () {
                    if (window.pageYOffset >= hnavTop) {
                        hnav.className = 'navchange nav';
                        hnav1.className = 'navchange nav1';
                    } else {
                        console.log(1);
                        hnav.className = 'nav';
                        hnav1.className = 'nav1'
                    }
                }
            } else {
                erro.style.opacity = '1';
            }
        } else {
            tick.style.animation = 'exhibit 3s forwards';
            setTimeout(function () {
                tick.style.animation = '';
            }, 3000)
        }
    } else {
        btn.className = 'btn1';
        erro.style.opacity = '1';
    }
})

// 点击头部里的nav里的li
var navlis = document.querySelectorAll('.head .nav li');
var classification = document.querySelector('.classification')
navlis[0].onclick = function () {
    first_page.style.display = 'block';
    goods.style.display = 'block';
    decoration.style.display = 'none';
    bgc.style.backgroundImage = 'url(./img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    bgc.style.height = 4.7 + 'rem';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    this.children[0].style.opacity = '1';
}
navlis[1].onclick = function () {
    first_page.style.display = 'none';
    goods.style.display = 'block';
    decoration.style.display = 'none';
    bgc.style.height = 2.8 + 'rem';
    bgc.style.backgroundImage = 'url(./img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    this.children[0].style.opacity = '1';

}
navlis[2].onclick = function () {
    first_page.style.display = 'none';
    goods.style.display = 'none';
    decoration.style.display = 'block';
    bgc.style.height = 6 + 'rem';
    bgc.style.backgroundImage = 'url(./img/bgc3.png.dpg)';
    hnav.style.backgroundImage = 'url(./img/bgc3.png.dpg)';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
}





// 点击尾部里的nav里的li
var flis = document.querySelectorAll('.foot li');
var hnav = document.querySelector('.head .nav');
var hnav1 = document.querySelector('.head .nav1');
var gnav = document.querySelector('.goods .nav');
var flag3 = 0;
var switchs = document.querySelector('.contain .head .nav1 .switchs')
flis[0].style.color = '#f10000';
flis[0].onclick = function () {
    first_page.style.display = 'block';
    hnav.style.display = 'block';
    hnav1.style.display = 'none';
    gnav.style.display = 'block';
    inners.style.display = 'block';
    classification.style.display = 'none';
    bgc.style.height = 4.7 + 'rem';
    bgc.style.backgroundImage = 'url(./img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < flis.length; i++) {
        flis[i].style.color = '';
    }
    this.style.color = '#f10000';
}
flis[1].onclick = function () {
    first_page.style.display = 'none';
    hnav.style.display = 'none';
    hnav1.style.display = 'block';
    goods.style.display = 'block';
    gnav.style.display = 'none';
    inners.style.display = 'block';
    classification.style.display = 'none';
    bgc.style.height = 2.8 + 'rem';
    bgc.style.backgroundImage = 'url(./img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < flis.length; i++) {
        flis[i].style.color = '';
    }
    this.style.color = '#f10000';
    // 点击切换状态
    switchs.onclick = function () {
        if (flag3 == 0) {
            for (var i = 0; i < glli.length; i++) {
                glli[i].className = 'newstyle';
                flag3 = 1;
                this.children[0].src = './img/cd1.png'
            }
        } else {
            for (var i = 0; i < glli.length; i++) {
                glli[i].className = '';
                flag3 = 0;
                this.children[0].src = './img/cd.png'
            }
        }

    }
}
flis[2].onclick = function () {
    inners.style.display = 'none';
    hnav.style.display = 'none';
    hnav1.style.display = 'none';
    classification.style.display = 'flex';
    for (var i = 0; i < flis.length; i++) {
        flis[i].style.color = '';
    }
    this.style.color = '#f10000';
}



//商品分类选项卡
var cflis = document.querySelectorAll('.classification>ul li');
var lboxs = document.querySelectorAll('.classification .list div');
for (var i = 0; i < cflis.length; i++) {
    cflis[i].index = i;
    cflis[i].onclick = function () {
        for (var j = 0; j < cflis.length; j++) {
            cflis[j].style.backgroundColor = '';
            console.log(1);
            lboxs[j].style.display = 'none';
        }
        this.style.backgroundColor = '#fff';
        lboxs[this.index].style.display = 'block';
    }
}

//点击进入详情页
var contain = document.querySelector('.contain')
var details = document.querySelector('.details')
var glliSrc = null;
var glli = document.querySelectorAll('.goods .list li')
var introduce = document.querySelector('.details .introduce');
for (var i = 0; i < glli.length; i++) {
    glli[i].onclick = function () {
        contain.style.display = 'none';
        details.style.display = 'block';
        glliSrc = this.children[0].src;
        introduce.children[0].src = glliSrc;
        window.onscroll = function () {
            if (window.pageYOffset > 0) {
                xnav.style.display = 'block';
                divs[0].className = 'toleft1';
                divs[1].className = 'dian1';
            } else {
                xnav.style.display = 'none';
                divs[0].className = 'toleft';
                divs[1].className = 'dian';
            }
        }
    }
}
// 详情页滚动事件
var divs = document.querySelectorAll('.details .revert div');
var xnav = document.querySelector('.details .nav');

//点击返回首页

divs[0].onclick = function () {
    contain.style.display = 'block';
    details.style.display = 'none';
    hnavTop = hnav.offsetTop;
    window.onscroll = function () {
        if (window.pageYOffset >= hnavTop) {
            hnav.className = 'navchange nav';
            hnav1.className = 'navchange nav1';
        } else {
            console.log(1);
            hnav.className = 'nav';
            hnav1.className = 'nav1'
        }
    }
}



// 详情页导航点击事件
var xlis = document.querySelectorAll('.details .nav li');
var jump = document.querySelectorAll('.details .introduce .jump');
for (var i = 0; i < xlis.length; i++) {
    xlis[i].index = i;
    xlis[i].onclick = function () {
        var sTop = jump[this.index].offsetTop - xnav.offsetHeight;
        console.log(sTop);
        window.scrollTo({
            top: sTop,
            behavior: "smooth"
        })
    }
}
// 详情页点击进入购物车页面
var buycar = document.querySelector('.details .foot .buycars');
var shopping_car = document.querySelector('.shopping-cart');
buycar.onclick = function () {
    details.style.display = 'none';
    shopping_car.style.display = 'block';
}

// 购物车选择框点击事件 
var commoditys = document.querySelectorAll('.shopping-cart .commodity');
var circles = document.querySelectorAll('.shopping-cart .active .circle');
var circle1s = document.querySelectorAll('.shopping-cart .goodss .circle1');
var fcir = document.querySelector('.shopping-cart .foot .circle2');
var flags = 0;
var allmo = document.querySelectorAll('.goodss .money .num span');
var money = 0;
var nums = 0;
var number = document.querySelector('.foot .settlement span');
var settlement = document.querySelector('.foot .money span');
var setbgc = document.querySelector('.foot .settlement');
var accounts = document.querySelector('.accounts');
for (var i = 0; i < circle1s.length; i++) {
    circle1s[i].setAttribute('money', '0')
}
//店铺点击事件
for (var i = 0; i < circles.length; i++) {
    circles[i].setAttribute('flag1', '0')
    circles[i].index = i;
    circles[i].onclick = function () {
        var licirs = this.parentNode.parentNode.children[2].querySelectorAll('.circle1');
        var allmos = this.parentNode.parentNode.children[2].querySelectorAll('.num span ');
        if (this.getAttribute('flag1') == 0) {
            this.style.backgroundImage = 'url(./img/cright.png)';
            for (var i = 0; i < licirs.length; i++) {
                licirs[i].style.backgroundImage = 'url(./img/cright.png)';
                licirs[i].setAttribute('flag2', '1');
                var m = allmos[i].innerHTML;
                licirs[i].setAttribute('money', m)

            }
            this.setAttribute('flag1', '1');
        } else {
            this.style.backgroundImage = 'url(./img/circle.png)';
            for (var i = 0; i < licirs.length; i++) {
                licirs[i].style.backgroundImage = 'url(./img/circle.png)';
                licirs[i].setAttribute('flag2', '0');
                licirs[i].setAttribute('money', '0')
            }
            this.setAttribute('flag1', '0');
        }
        // 判断店铺按钮是否都选中。决定全选按钮是否选中
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getAttribute('flag1') == 0) {
                flags = 0;
                fcir.style.backgroundImage = 'url(./img/circle.png)';
                break;
            } else {
                fcir.style.backgroundImage = 'url(./img/cright.png)';
                flags = 1;
            }
        }
        // 算钱
        money = 0;
        nums = 0;
        allmo = document.querySelectorAll('.goodss .money .num span');
        for (var i = 0; i < allmo.length; i++) {
            money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
            if (circle1s[i].getAttribute('money') != 0) {
                nums += parseInt(amount[i].innerHTML);
            }
        }
        settlement.innerHTML = money;
        number.innerHTML = '(' + nums + ')件';
        if (money == 0) {
            setbgc.className = 'settlement bgc'
        } else {
            setbgc.className = 'settlement bgc1'
        }
    }
}

// 单个商品点击事件
for (var i = 0; i < circle1s.length; i++) {
    circle1s[i].setAttribute('flag2', '0')
    circle1s[i].index = i;
    circle1s[i].onclick = function () {
        // 获取店铺全选按钮
        allcir = this.parentNode.parentNode.parentNode.parentNode.children[0].children[0];
        if (this.getAttribute('flag2') == 0) {
            this.style.backgroundImage = 'url(./img/cright.png)';
            this.setAttribute('flag2', '1')
            var m = allmo[this.index].innerHTML;
            this.setAttribute('money', m)
        }
        else {
            this.style.backgroundImage = 'url(./img/circle.png)';
            this.setAttribute('flag2', '0')
            this.setAttribute('money', '0')
            flags = 0;
        }
        //  判断是否全部商品选中。决定店铺按钮是否选中
        var licirs = this.parentNode.parentNode.parentNode.querySelectorAll('.circle1');
        for (var i = 0; i < licirs.length; i++) {
            if (licirs[i].getAttribute('flag2') == 0) {
                allcir.setAttribute('flag1', '1');
                break;
            } else {
                allcir.setAttribute('flag1', '0');
            }
        }
        if (allcir.getAttribute('flag1') == 0) {
            allcir.style.backgroundImage = 'url(./img/cright.png)';
            allcir.setAttribute('flag1', '1');
        } else {
            allcir.style.backgroundImage = 'url(./img/circle.png)';
            allcir.setAttribute('flag1', '0');

        }
        // 判断店铺按钮是否都选中。决定全选按钮是否选中
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getAttribute('flag1') == 0) {
                flags = 0;
                fcir.style.backgroundImage = 'url(./img/circle.png)';
                break;
            } else {
                fcir.style.backgroundImage = 'url(./img/cright.png)';
            }
        }
        // 算钱
        money = 0;
        nums = 0;
        allmo = document.querySelectorAll('.goodss .money .num span');
        for (var i = 0; i < allmo.length; i++) {
            money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
            if (circle1s[i].getAttribute('money') != 0) {
                nums += parseInt(amount[i].innerHTML);
            }

        }
        settlement.innerHTML = money;
        number.innerHTML = '(' + nums + ')件';
        if (money == 0) {
            setbgc.className = 'settlement bgc'
        } else {
            setbgc.className = 'settlement bgc1'
        }
    }
}
// 全选点击事件
fcir.onclick = function () {
    if (flags == 0) {
        setbgc.className = 'settlement bgc1'
        this.style.backgroundImage = 'url(./img/cright.png)';
        setbgc.className = 'settlement bgc1';
        allmo = document.querySelectorAll('.goodss .money .num span');
        for (var i = 0; i < circle1s.length; i++) {
            console.log(circle1s);
            circle1s[i].style.backgroundImage = 'url(./img/cright.png)';
            circle1s[i].setAttribute('flag2', '1')
            var m = allmo[i].innerHTML;
            circle1s[i].setAttribute('money', m)
        }
        for (var i = 0; i < circles.length; i++) {
            circles[i].style.backgroundImage = 'url(./img/cright.png)';
            circles[i].setAttribute('flag1', '1')
        }
        flags = 1;
    } else {
        setbgc.className = 'settlement bgc'
        this.style.backgroundImage = 'url(./img/circle.png)';
        for (var i = 0; i < circle1s.length; i++) {
            circle1s[i].style.backgroundImage = 'url(./img/circle.png)';
            circle1s[i].setAttribute('flag2', '0')
            circle1s[i].setAttribute('money', '0')
        }
        for (var i = 0; i < circles.length; i++) {
            circles[i].style.backgroundImage = 'url(./img/circle.png)';
            circles[i].setAttribute('flag1', '0')
        }
        flags = 0;
    }

    // 算钱
    money = 0;
    nums = 0;
    allmo = document.querySelectorAll('.goodss .money .num span');
    for (var i = 0; i < allmo.length; i++) {
        money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
        if (circle1s[i].getAttribute('money') != 0) {
            nums += parseInt(amount[i].innerHTML);
        }
    }
    settlement.innerHTML = money;
    number.innerHTML = '(' + nums + ')件';
}

//购物车页面点击返回首详情页
var re = document.querySelector('.shopping-cart .head .top img');
re.onclick = function () {
    details.style.display = 'block';
    shopping_car.style.display = 'none';
}

// 结算页面点击返回购物车
var ret = document.querySelector('.accounts .top i')
ret.onclick = function () {
    accounts.style.display = 'none';
    shopping_car.style.display = 'block';
}

// 购物车页面点击去结算页面

setbgc.onclick = function () {
    if (nums != 0) {
        accounts.style.display = 'block';
        shopping_car.style.display = 'none';
    }
}

// 点击是商品数量改变
var add = document.querySelectorAll('.commodity li .add');
var reduce = document.querySelectorAll('.commodity li .reduce');
var amount = document.querySelectorAll('.commodity li .numbers');
// 增加
for (var i = 0; i < add.length; i++) {
    add[i].index = i;
    add[i].onclick = function () {
        amount[this.index].innerHTML = parseInt(amount[this.index].innerHTML) + 1;
        money = 0;
        nums = 0;
        allmo = document.querySelectorAll('.goodss .money .num span');
        for (var i = 0; i < allmo.length; i++) {
            money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
            if (circle1s[i].getAttribute('money') != 0) {
                nums += parseInt(amount[i].innerHTML);
            }
        }
        settlement.innerHTML = money;
        number.innerHTML = '(' + nums + ')件';
    }
}
// 减少
for (var i = 0; i < reduce.length; i++) {
    reduce[i].index = i;
    reduce[i].onclick = function () {
        if (amount[this.index].innerHTML > 1) {
            amount[this.index].innerHTML = parseInt(amount[this.index].innerHTML) - 1;
            money = 0;
            nums = 0;
            allmo = document.querySelectorAll('.goodss .money .num span');
            for (var i = 0; i < allmo.length; i++) {
                money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
                if (circle1s[i].getAttribute('money') != 0) {
                    nums += parseInt(amount[i].innerHTML);
                }
            }
            settlement.innerHTML = money;
            number.innerHTML = '(' + nums + ')件';
        }
    }
}

//删除事件
var splength = shopping_car.children.length - commoditys.length;
var dels = document.querySelectorAll('.commodity li .del');
for (var i = 0; i < dels.length; i++) {
    dels.index = i;
    dels[i].onclick = function () {
        var li = this.parentNode.parentNode.parentNode;
        var ul = li.parentNode;
        var scar =ul.parentNode.parentNode;
        allcir = li.parentNode.parentNode.children[0].children[0];
        if (li.parentNode.children.length > 1) {
            li.parentNode.removeChild(li);
        }
        else {
            li.parentNode.parentNode.parentNode.removeChild(li.parentNode.parentNode)
        }
        money = 0;
        // dels = document.querySelectorAll('.commodity li .del');
        allmo = document.querySelectorAll('.goodss .money .num span');
        circle1s = document.querySelectorAll('.shopping-cart .goodss .circle1');
        // 重新把钱存到里面
        for (var i = 0; i < circle1s.length; i++) {
            circle1s[i].index = i;
            var m = allmo[circle1s[i].index].innerHTML;
            this.setAttribute('money', m)
        }
        nums = 0;
        amount = document.querySelectorAll('.commodity li .numbers');
        for (var i = 0; i < allmo.length; i++) {
            money += parseInt(circle1s[i].getAttribute('money')) * amount[i].innerHTML;
            if (circle1s[i].getAttribute('money') != 0) {
                nums += parseInt(amount[i].innerHTML);
            }
        }
        // 变颜色
        if (money == 0) {
            setbgc.className = 'settlement bgc'
        } else {
            setbgc.className = 'settlement bgc1'
        }
        settlement.innerHTML = money;
        number.innerHTML = '(' + nums + ')件';
        // 判断店铺按钮是否要选中
        var licirs = ul.querySelectorAll('.circle1');
        for (var i = 0; i < licirs.length; i++) {
            if (licirs[i].getAttribute('flag2') == 0) {
                allcir.setAttribute('flag1', '1');
                break;
            } else {
                allcir.setAttribute('flag1', '0');
            }
        }
        if (allcir.getAttribute('flag1') == 0) {
            allcir.style.backgroundImage = 'url(./img/cright.png)';
            allcir.setAttribute('flag1', '1');
        } else {
            allcir.style.backgroundImage = 'url(./img/circle.png)';
            allcir.setAttribute('flag1', '0');

        }


        // 判断店铺按钮是否都选中。决定全选按钮是否选中
        circles = document.querySelectorAll('.shopping-cart .active .circle');
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getAttribute('flag1') == 0) {
                flags = 0;
                fcir.style.backgroundImage = 'url(./img/circle.png)';
                break;
            } else {
                fcir.style.backgroundImage = 'url(./img/cright.png)';
            }
        }
        // 判断是否删完了，把全选关了
        var shopping_car = document.querySelector('.shopping-cart')
        if (shopping_car.children.length == splength) {
            fcir.style.backgroundImage = 'url(./img/circle.png)';
            fcir.onclick = null;
        }
        // 刷新数据  增加和删除的长度
        add = scar.querySelectorAll('.add');
        for (var i = 0; i < add.length; i++) {
            add[i].index = i;
        }
        reduce = scar.querySelectorAll('.reduce');
        for (var i = 0; i < reduce.length; i++) {
            reduce[i].index = i;
        }


    }
}

// 点击结算成功
var accounts = document.querySelector('.accounts')
var accounts_success = document.querySelector('.accounts-success')
var submit = document.querySelector('.accounts .foot .inline ')
var re1 = document.querySelector('.accounts-success img')
submit.onclick = function () {
    accounts.style.display = 'none';
    accounts_success.style.display = 'block';
}
re1.onclick = function () {
    accounts.style.display = 'block';
    accounts_success.style.display = 'none';
}


