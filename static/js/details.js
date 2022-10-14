// 获取数据
var sw = document.querySelector('.sw');
var sc = document.querySelector('.sc');
var id = localStorage.getItem('id')
var ml = document.querySelector('.introduce .money .left');
var ctitle = document.querySelector('.introduce .conten .title');
var imgs = document.querySelector('.details .introduce .list .title .imgs');
sw.innerHTML = '';
axios({
    method: 'get',
    url: `http://127.0.0.1:3000/details/:${id}`,
}).then(data => {
    for (let k of data.data[1]) {
        for (let j in k) {
            sw.innerHTML += `
            <div class="swiper-slide">   <img src="${k[j]}" alt=""></div>
            `
        }
    }
    var myS = new Swiper('.sc', {
        direction: 'horizontal',
        autoplay: 2000,
        loop: true,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false,
    })
    ml.innerHTML = `
    <p>家电99超级秒杀节 今晚8点巅峰开抢</p>
    <p>¥<span>${data.data[0][0].price}</span>.00</p>
    `
    ctitle.innerHTML = `<img src="../img/f1.png" alt="">
    ${data.data[0][0].title}
    `
    for (let k of data.data[2]) {
        for (let j in k) {
            imgs.innerHTML += `
            <img src="${k[j]}" alt="">
            `
        }
        for (let j in k) {
            imgs.innerHTML += `
            <img src="${k[j]}" alt="">
            `
        }
    }
})
// 详情页滚动事件
var divs = document.querySelectorAll('.details .revert div');
var xnav = document.querySelector('.details .nav');
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


//返回首页
divs[0].onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/index.html'
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

//猜你喜欢选项卡
var likelis = document.querySelectorAll('.details .introduce .list .title li');
var likespans = document.querySelectorAll('.details .introduce .list .title li span');
var likedivs = document.querySelectorAll('.details .introduce .list .title >div');
likespans[0].style.opacity = 1
for (var i = 0; i < likelis.length; i++) {
    likelis[i].index = i;
    likelis[i].onclick = function () {
        for (var i = 0; i < likelis.length; i++) {
            likedivs[i].style.display = 'none'
            likespans[i].style.opacity = 0
        }
        likedivs[this.index].style.display = 'block'
        likespans[this.index].style.opacity = 1
    }

}
// 详情页点击进入购物车页面
var buycar = document.querySelector('.details .foot .buycar');
var justbuy = document.querySelector('.details .foot .justbuy');
var tick = document.querySelector('.details .tick');
let flag = 1;
let dmask = document.querySelector('.dmask')
let lmask = document.querySelector('.lmask')
// 点击蒙版显示
let reduces = document.querySelector('.dmask .cart-cen .cen-cen .cen-right span:first-child')
let adds = document.querySelector('.dmask .cart-cen .cen-cen .cen-right span:last-child')
let mlis = document.querySelectorAll('.dmask .top-list ul li')
let cart_top = document.querySelector('.dmask .cart .cart-top')
let nums = document.querySelector('.dmask .cart-cen .cen-cen .cen-right .active')
let num = document.querySelector('.dmask .cart-cen .cen-cen .cen-right .active').innerHTML

buycar.onclick = function () {
    let num = 1
    nums.innerHTML = 1;
    let size = '经典普通款'
    for (let i = 0; i < mlis.length; i++) {
        mlis[i].className = ''
        mlis[i].setAttribute('flag', '0')
    }
    mlis[0].className = 'active'
    // 渲染数据
    axios({
        method: 'get',
        url: `http://127.0.0.1:3000/getdata/${id}`
    }).then(data => {
        let price = data.data[0].price;;
        let img = data.data[0].img1;
        let title = data.data[0].title;
        // 点击数量增加
        adds.onclick = function () {
            num = parseInt(num) + 1
            nums.innerHTML = num
            let nums1 = document.querySelector('.top-cen span:last-child')
            nums1.innerHTML = num + '个'
        }
        // 点击数量减少
        reduces.onclick = function () {
            if (num > 1) {
                num = parseInt(num) - 1
                nums.innerHTML = num
                let nums1 = document.querySelector('.top-cen span:last-child')
                nums1.innerHTML = num + '个'
            }
        }
        for (let k of data.data) {
            cart_top.innerHTML = `
                    <img src="${img}" alt="">
                    <div class="top-cen">
                        <p>
                            <i>¥</i>
                            <span>${price}</span>
                            <i>.00</i>
                        </p >
                        <span>已选</span>
                        <span class="active">${size},</span>
                        <span>${num}个</span>
                    </div>
                    <div class="top-right">
                        <span>X</span>
                    </div>`
        }
        //点击将数据加入购物车数据表
        let btn = document.querySelector('.dmask .cart .cart-bottom p')
        btn.onclick = function () {
            dmask.style.display = 'none'
            tick.style.animation = 'exhibit 1s forwards';
            setTimeout(function () {
                tick.style.animation = '';
            }, 1000)
            axios({
                method: 'post',
                url: 'http://127.0.0.1:3000/addshopping',
                data: {
                    id,
                    title,
                    img,
                    price,
                    num,
                    size
                }
            })
        }
        let cha = document.querySelector('.dmask .top-right span')
        cha.onclick = function () {
            dmask.style.display = 'none'
        }
    })
    dmask.style.display = 'block'
    // if(flag == 1){
    //     flag = 0;
    //     tick.style.animation = 'exhibit 1s forwards';
    //     setTimeout(function () {
    //         tick.style.animation = '';
    //         flag = 1;
    //         axios({
    //             method: 'get',
    //             url: `http://127.0.0.1:3000/addDb/:${id}`
    //         })
    //     }, 1000)
    // }
}
// 选择规格
for (let i = 0; i < mlis.length; i++) {
    mlis[i].setAttribute('flag', '0')
    mlis[0].setAttribute('flag', '1')
    mlis[i].onclick = function () {
        nums.innerHTML = 1;
        num = 1;
        if (this.getAttribute('flag') == 0) {
            for (let i = 0; i < mlis.length; i++) {
                mlis[i].className = ''
                mlis[i].setAttribute('flag', '0')
            }
            mlis[i].className = 'active'
            mlis[i].setAttribute('flag', '1')
            let size = this.innerHTML
            // 点击数量增加
            adds.onclick = function () {
                num = parseInt(num) + 1
                nums.innerHTML = num
                let nums1 = document.querySelector('.dmask .top-cen span:last-child')
                nums1.innerHTML = num + '个'
            }
            // 点击数量减少
            reduces.onclick = function () {
                if (num > 1) {
                    num = parseInt(num) - 1
                    nums.innerHTML = num
                    let nums1 = document.querySelector('.dmask .top-cen span:last-child')
                    nums1.innerHTML = num + '个'
                }
            }
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/getdata/${id}`
            }).then(data => {
                let price = null;
                let img = null;
                let title = data.data[0].title;
                for (let k of data.data) {
                    if (i == 0) {
                        price = k.price
                        img = k.img1
                    }
                    if (i == 1) {
                        price = k.price + 10
                        img = k.img2
                    }
                    if (i == 2) {
                        price = k.price + 20
                        img = k.img3
                    }
                    cart_top.innerHTML = `
                    <img src="${img}" alt="">
                    <div class="top-cen">
                        <p>
                            <i>¥</i>
                            <span>${price}</span>
                            <i>.00</i>
                        </p >
                        <span>已选</span>
                        <span class="active">${size},</span>
                        <span>${num}个</span>
                    </div>
                    <div class="top-right">
                        <span>X</span>
                    </div>`
                }
                // 点击蒙版消失
                let cha = document.querySelector('.dmask .top-right span')
                cha.onclick = function () {
                    dmask.style.display = 'none'
                }
                //点击将数据加入购物车数据表
                let btn = document.querySelector('.dmask .cart .cart-bottom p')
                btn.onclick = function () {
                    dmask.style.display = 'none'
                    tick.style.animation = 'exhibit 1s forwards';
                    setTimeout(function () {
                        tick.style.animation = '';
                    }, 1000)
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3000/addshopping',
                        data: {
                            id,
                            title,
                            img,
                            price,
                            num,
                            size
                        }
                    })
                }
            })
        }
        else {
            for (let i = 0; i < mlis.length; i++) {
                mlis[i].className = ''
                mlis[i].setAttribute('flag', '0')
            }
        }
    }
}

// 清空结算页面商品
axios({
    method: 'get',
    url: `http://127.0.0.1:3000/empty1`
})
// 
// 点击立即购买
// justbuy.onclick = function () {
//     axios({
//         method: 'get',
//         url: `http://127.0.0.1:3000/justbuy/${id}`
//     }).then(data => {
//         window.location.href = 'http://127.0.0.1:3000/html/accounts.html'
//     })
// }
// 立即购买
let lreduces = document.querySelector('.lmask .cart-cen .cen-cen .cen-right span:first-child')
let ladds = document.querySelector('.lmask .cart-cen .cen-cen .cen-right span:last-child')
let lmlis = document.querySelectorAll('.lmask .top-list ul li')
let lcart_top = document.querySelector('.lmask .cart .cart-top')
let lnums = document.querySelector('.lmask .cart-cen .cen-cen .cen-right .active')
let lnum = document.querySelector('.lmask .cart-cen .cen-cen .cen-right .active').innerHTML

justbuy.onclick = function () {
    let lnum = 1
    lnums.innerHTML = 1;
    let lsize = '经典普通款'
    for (let i = 0; i < lmlis.length; i++) {
        lmlis[i].className = ''
        lmlis[i].setAttribute('flag', '0')
    }
    lmlis[0].className = 'active'
    // 渲染数据
    axios({
        method: 'get',
        url: `http://127.0.0.1:3000/getdata/${id}`
    }).then(data => {
        let price = data.data[0].price;;
        let img = data.data[0].img1;
        let title = data.data[0].title;
        // 点击数量增加
        ladds.onclick = function () {
            lnum = parseInt(lnum) + 1
            lnums.innerHTML = lnum
            let lnums1 = document.querySelector('.lmask .top-cen span:last-child')
            lnums1.innerHTML = lnum + '个'
        }
        // 点击数量减少
        lreduces.onclick = function () {
            if (lnum > 1) {
                lnum = parseInt(lnum) - 1
                lnums.innerHTML = lnum
                let lnums1 = document.querySelector('.lmask .top-cen span:last-child')
                lnums1.innerHTML = lnum + '个'
            }
        }
        for (let k of data.data) {
            lcart_top.innerHTML = `
                    <img src="${img}" alt="">
                    <div class="top-cen">
                        <p>
                            <i>¥</i>
                            <span>${price}</span>
                            <i>.00</i>
                        </p >
                        <span>已选</span>
                        <span class="active">${lsize},</span>
                        <span>${lnum}个</span>
                    </div>
                    <div class="top-right">
                        <span>X</span>
                    </div>`
        }
        //点击将数据加入购物车数据表
        let btn = document.querySelector('.lmask .cart .cart-bottom p')
        btn.onclick = function () {
            lmask.style.display = 'none'
            tick.style.animation = 'exhibit 1s forwards';
            setTimeout(function () {
                tick.style.animation = '';
            }, 1000)
            axios({
                method: 'post',
                url: 'http://127.0.0.1:3000/addacounts',
                data: {
                    id,
                    title,
                    img,
                    price,
                    lnum,
                    lsize
                }
            }).then(data => {
                window.location.href = 'http://127.0.0.1:3000/html/accounts.html'
            })
        }
        let cha = document.querySelector('.lmask .top-right span')
        cha.onclick = function () {
            lmask.style.display = 'none'
        }
    })
    lmask.style.display = 'block'
}
// 选择规格
for (let i = 0; i < lmlis.length; i++) {
    lmlis[i].setAttribute('flag', '0')
    lmlis[0].setAttribute('flag', '1')
    lmlis[i].onclick = function () {
        lnums.innerHTML = 1;
        lnum = 1;
        if (this.getAttribute('flag') == 0) {
            for (let i = 0; i < lmlis.length; i++) {
                lmlis[i].className = ''
                lmlis[i].setAttribute('flag', '0')
            }
            lmlis[i].className = 'active'
            lmlis[i].setAttribute('flag', '1')
            let lsize = this.innerHTML
            // 点击数量增加
            ladds.onclick = function () {
                lnum = parseInt(lnum) + 1
                lnums.innerHTML = lnum
                let lnums1 = document.querySelector('.lmask .top-cen span:last-child')
                lnums1.innerHTML = lnum + '个'
            }
            // 点击数量减少
            lreduces.onclick = function () {
                if (lnum > 1) {
                    lnum = parseInt(lnum) - 1
                    lnums.innerHTML = lnum
                    let lnums1 = document.querySelector('.lmask .top-cen span:last-child')
                    lnums1.innerHTML = lnum + '个'
                }
            }
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/getdata/${id}`
            }).then(data => {
                let price = null;
                let img = null;
                let title = data.data[0].title;
                for (let k of data.data) {
                    if (i == 0) {
                        price = k.price
                        img = k.img1
                    }
                    if (i == 1) {
                        price = k.price + 10
                        img = k.img2
                    }
                    if (i == 2) {
                        price = k.price + 20
                        img = k.img3
                    }
                    lcart_top.innerHTML = `
                    <img src="${img}" alt="">
                    <div class="top-cen">
                        <p>
                            <i>¥</i>
                            <span>${price}</span>
                            <i>.00</i>
                        </p >
                        <span>已选</span>
                        <span class="active">${lsize},</span>
                        <span>${lnum}个</span>
                    </div>
                    <div class="top-right">
                        <span>X</span>
                    </div>`
                }
                // 点击蒙版消失
                let cha = document.querySelector('.lmask .top-right span')
                cha.onclick = function () {
                    lmask.style.display = 'none'
                }
                //点击将数据加入结算数据表
                let btn = document.querySelector('.lmask .cart .cart-bottom p')
                btn.onclick = function () {
                    lmask.style.display = 'none'
                    tick.style.animation = 'exhibit 1s forwards';
                    setTimeout(function () {
                        tick.style.animation = '';
                    }, 1000)
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3000/addacounts',
                        data: {
                            id,
                            title,
                            img,
                            price,
                            lnum,
                            lsize
                        }
                    }).then(data => {
                        console.log(111111111);
                        window.location.href = 'http://127.0.0.1:3000/html/accounts.html'
                    })
                }
            })
        }
        else {
            for (let i = 0; i < lmlis.length; i++) {
                lmlis[i].className = ''
                lmlis[i].setAttribute('flag', '0')
            }
        }
    }
}

// 详情页点击进入购物车页面
var buycars = document.querySelector('.details .foot .buycars');
buycars.onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/shopping.html'
}
