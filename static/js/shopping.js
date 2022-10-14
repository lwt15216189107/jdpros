// 购物车选择框点击事件 
// var id = localStorage.getItem('id')
var comul = document.querySelector('.shopping-cart .commodity>ul');
var active = document.querySelector('.shopping-cart .commodity .active');
var discount = document.querySelector('.shopping-cart .commodity .discount');
var listul = document.querySelector('.shopping-cart .list ul');
axios({
    method: 'get',
    url: `http://127.0.0.1:3000/getshopping`
}).then(data => {
    for (let k of data.data) {
        if (data.data.length != 0) {
            active.innerHTML = `
            <div class="circle"></div>
                <img src="../img/dp.png" alt="">
                <p>联合促销活动 ></p>
                <span>已免运费</span>
            `
            discount.innerHTML = `
            <span>跨品类打折</span>
                <p>满2类总价9.7折，每类最多5件，还差1类</p>
                <span>去凑单 ></span>
            `
        }

        comul.innerHTML += `
        <li id="${k.id}">
                    <div class="goodss">
                        <div class="circle1"></div>
                        <img src="${k.img}" alt="">
                        <div class="right">
                            <p class="ellipsis-2">
                            ${k.title}
                            <div class="service">
                                <div class="service1">
                                    <p class="ellipsis">${k.size}</p>
                                    <span>,选服务
                                        <i class="iconfont icon-jiantouxia"></i>
                                    </span>
                                </div>
                                <div class="service2">
                                    <p>选服务
                                        <i class="iconfont icon-jiantouxia"></i>
                                    </p>
                                </div>
                            </div>
                            <span>30天价保</span>
                            <img src="../img/f.png" alt="">
                            <div class="money">
                                <p class="num">¥<span>${k.price}</span>.00</p>
                                <p class="count">
                                    <span class="reduce ${k.id}">-</span>
                                    <span class="numbers">${k.num}</span>
                                    <span class="add ${k.id}">+</span>
                                </p>
                            </div>
                            <div class="del ${k.id}">删除</div>
                        </div>
                    </div>
                </li>
        `
    }
    var shopping_car = document.querySelector('.shopping-cart');
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
                this.style.backgroundImage = 'url(../img/cright.png)';
                for (var i = 0; i < licirs.length; i++) {
                    licirs[i].style.backgroundImage = 'url(../img/cright.png)';
                    licirs[i].setAttribute('flag2', '1');
                    var m = allmos[i].innerHTML;
                    licirs[i].setAttribute('money', m)

                }
                this.setAttribute('flag1', '1');
            } else {
                this.style.backgroundImage = 'url(../img/circle.png)';
                for (var i = 0; i < licirs.length; i++) {
                    licirs[i].style.backgroundImage = 'url(../img/circle.png)';
                    licirs[i].setAttribute('flag2', '0');
                    licirs[i].setAttribute('money', '0')
                }
                this.setAttribute('flag1', '0');
            }
            // 判断店铺按钮是否都选中。决定全选按钮是否选中
            for (var i = 0; i < circles.length; i++) {
                if (circles[i].getAttribute('flag1') == 0) {
                    flags = 0;
                    fcir.style.backgroundImage = 'url(../img/circle.png)';
                    break;
                } else {
                    fcir.style.backgroundImage = 'url(../img/cright.png)';
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
                this.style.backgroundImage = 'url(../img/cright.png)';
                this.setAttribute('flag2', '1')
                var m = allmo[this.index].innerHTML;
                this.setAttribute('money', m)
            }
            else {
                this.style.backgroundImage = 'url(../img/circle.png)';
                this.setAttribute('flag2', '0')
                this.setAttribute('money', '0')
                flags = 0;
            }
            //  判断是否全部商品选中。决定店铺按钮是否选中
            var licirs = this.parentNode.parentNode.parentNode.querySelectorAll('.circle1');
            for (var i = 0; i < licirs.length; i++) {
                if (licirs[i].getAttribute('flag2') == 0) {
                    allcir.setAttribute('flag1', '1');
                    // allcir.setAttribute('flag1', '0');
                    break;
                } else {
                    allcir.setAttribute('flag1', '0');
                    // allcir.setAttribute('flag1', '1');
                }
            }
            if (allcir.getAttribute('flag1') == 0) {
                allcir.style.backgroundImage = 'url(../img/cright.png)';
                // allcir.style.backgroundImage = 'url(../img/circle.png)';
                allcir.setAttribute('flag1', '1');
            } else {
                allcir.style.backgroundImage = 'url(../img/circle.png)';
                // allcir.style.backgroundImage = 'url(../img/cright.png)';
                allcir.setAttribute('flag1', '0');

            }
            // 判断店铺按钮是否都选中。决定全选按钮是否选中
            for (var i = 0; i < circles.length; i++) {
                if (circles[i].getAttribute('flag1') == 0) {
                    flags = 0;
                    fcir.style.backgroundImage = 'url(../img/circle.png)';
                    break;
                } else {
                    fcir.style.backgroundImage = 'url(../img/cright.png)';
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
            this.style.backgroundImage = 'url(../img/cright.png)';
            setbgc.className = 'settlement bgc1';
            allmo = document.querySelectorAll('.goodss .money .num span');
            for (var i = 0; i < circle1s.length; i++) {
                console.log(circle1s);
                circle1s[i].style.backgroundImage = 'url(../img/cright.png)';
                circle1s[i].setAttribute('flag2', '1')
                var m = allmo[i].innerHTML;
                circle1s[i].setAttribute('money', m)
            }
            for (var i = 0; i < circles.length; i++) {
                circles[i].style.backgroundImage = 'url(../img/cright.png)';
                circles[i].setAttribute('flag1', '1')
            }
            flags = 1;
        } else {
            setbgc.className = 'settlement bgc'
            this.style.backgroundImage = 'url(../img/circle.png)';
            for (var i = 0; i < circle1s.length; i++) {
                circle1s[i].style.backgroundImage = 'url(../img/circle.png)';
                circle1s[i].setAttribute('flag2', '0')
                circle1s[i].setAttribute('money', '0')
            }
            for (var i = 0; i < circles.length; i++) {
                circles[i].style.backgroundImage = 'url(../img/circle.png)';
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
        window.location.href = 'http://127.0.0.1:3000/html/details.html'
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
            var id = this.className.slice(4)
            var size = this.parentNode.parentNode.parentNode.querySelector('.ellipsis').innerHTML
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/add/${id}/${size}`
            })
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
                var id = this.className.slice(7)
                var size = this.parentNode.parentNode.parentNode.querySelector('.ellipsis').innerHTML
                axios({
                    method: 'get',
                    url: `http://127.0.0.1:3000/reduce/${id}/${size}`
                })
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
            var scar = ul.parentNode.parentNode;
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
                allcir.style.backgroundImage = 'url(../img/cright.png)';
                allcir.setAttribute('flag1', '1');
            } else {
                allcir.style.backgroundImage = 'url(../img/circle.png)';
                allcir.setAttribute('flag1', '0');
            }


            // 判断店铺按钮是否都选中。决定全选按钮是否选中
            circles = document.querySelectorAll('.shopping-cart .active .circle');
            for (var i = 0; i < circles.length; i++) {
                if (circles[i].getAttribute('flag1') == 0) {
                    flags = 0;
                    fcir.style.backgroundImage = 'url(../img/circle.png)';
                    break;
                } else {
                    fcir.style.backgroundImage = 'url(../img/cright.png)';
                }
            }
            // 判断是否删完了，把全选关了
            var shopping_car = document.querySelector('.shopping-cart')
            if (shopping_car.children.length == splength) {
                fcir.style.backgroundImage = 'url(../img/circle.png)';
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
            var id = this.className.slice(4)
            var size = this.parentNode.querySelector('.ellipsis').innerHTML
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/delete/${id}/${size}`
            })
        }
    }
    // // 结算页面点击返回购物车
    // var ret = document.querySelector('.accounts .top i')
    // ret.onclick = function () {
    //     accounts.style.display = 'none';
    //     shopping_car.style.display = 'block';
    // }

    // 购物车页面点击去结算页面
    // 先将数据库里的结算商品数据清空
    axios({
        method: 'get',
        url: `http://127.0.0.1:3000/empty1`
    })

    setbgc.onclick = function () {
        if (nums != 0) {
            window.location.href = 'http://127.0.0.1:3000/html/accounts.html'
            let circles = document.querySelectorAll('.commodity>ul li .goodss .circle1')
            let money = settlement.innerHTML;
            localStorage.setItem('money', `${money}`)
            for (let i = 0; i < circles.length; i++) {
                if (circles[i].getAttribute('flag2') == 1) {
                    let id = circles[i].parentNode.parentNode.id;
                    let size = circles[i].parentNode.querySelector('.ellipsis').innerHTML;
                    axios({
                        method: 'get',
                        url: `http://127.0.0.1:3000/addbuy/${id}/${size}`
                    })
                }
            }
        }
    }
})

listul.innerHTML = ''
axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/index',
}).then(data => {
    for (let k of data.data) {
        listul.innerHTML += `
            <li id='${k.id}'>
                                <img src="${k.img1}" alt="">
                                <div class="content">
                                    <p class="ellipsis-2">
                                        <span>热销</span>
                                        ${k.title}
                                    </p>
                                    <span>本店电吹风热销第${k.ranking}名</span>
                                    <p>¥<i>${k.price}</i>.00 <span>${k.reduce}</span></p>
                                    <p>${k.evaluate}+条评价 <span>好评${k.good}%</span></p>
                                </div>
                            </li>
            `
    }
    let lis = listul.querySelectorAll('li');
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            localStorage.setItem('id', `${lis[i].id}`)
            window.location = 'http://127.0.0.1:3000/html/details.html'
        }
    }
})

