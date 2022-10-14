var bgc = document.querySelector('.bgc');
var head = document.querySelector('.head');
var first_page = document.querySelector('.inners .first-page');
var goods = document.querySelector('.inners .goods');
var inners = document.querySelector('.inners');
var foot = document.querySelector('.foot');
var decoration = document.querySelector('.inners .decoration');
var goodsul = document.querySelector('.inners .goods .list ul');
var contain = document.querySelector('.contain')

var clicks = document.querySelectorAll('.first-page .hot .click ')
for(let i = 0;i<clicks.length;i++){
    clicks[i].onclick=function(){
        localStorage.setItem('id', `${clicks[i].id}`)
        window.location = 'http://127.0.0.1:3000/html/details.html'
    }
}
axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/index',
}).then(data => {
    for (let k of data.data) {
        goodsul.innerHTML += `
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
    let lis = goodsul.querySelectorAll('li');
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            localStorage.setItem('id', `${lis[i].id}`)
            window.location = 'http://127.0.0.1:3000/html/details.html'
        }
    }
})
// 点击头部里的nav里的li
var navlis = document.querySelectorAll('.head .nav li');
var classification = document.querySelector('.classification')
navlis[0].onclick = function () {
    first_page.style.display = 'block';
    goods.style.display = 'block';
    decoration.style.display = 'none';
    bgc.style.backgroundImage = 'url(../img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    bgc.style.height = 4.7 + 'rem';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    this.children[0].style.opacity = '1';
    goodsul.innerHTML = ''
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/index',
    }).then(data => {
        for (let k of data.data) {
            goodsul.innerHTML += `
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
        let lis = goodsul.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                localStorage.setItem('id', `${lis[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
    })
}
navlis[1].onclick = function () {
    first_page.style.display = 'none';
    goods.style.display = 'block';
    decoration.style.display = 'none';
    bgc.style.height = 2.8 + 'rem';
    bgc.style.backgroundImage = 'url(../img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    this.children[0].style.opacity = '1';
}
var shopul = document.querySelector('.decoration .shopping ul')
var hotul = document.querySelector('.decoration .hot ul')
var remul = document.querySelector('.decoration .recommend .list ul')
var secul = document.querySelector('.decoration .seckill .box')
navlis[2].onclick = function () {
    first_page.style.display = 'none';
    goods.style.display = 'none';
    decoration.style.display = 'block';
    bgc.style.height = 6 + 'rem';
    bgc.style.backgroundImage = 'url(../img/bgc3.png.dpg)';
    hnav.style.backgroundImage = 'url(../img/bgc3.png.dpg)';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    secul.innerHTML = ''
    hotul.innerHTML = ''
    shopul.innerHTML = ''
    remul.innerHTML = ''
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/decoration',
    }).then(data => {
        for (let k of data.data[0]) {
            shopul.innerHTML += `
            <li id='${k.id}'>
              <img src="${k.img1}" alt="">
              <p>${k.reduce}</p>
              <span>¥${k.price}.0</span>
            </li>
         `
        }
        for (let k of data.data[1]) {
            hotul.innerHTML += `
            <li id='${k.id}'>
              <img src="${k.img1}" alt="">
              <p>小适小米有品有售家用电吹风机</p>
              <span>${k.evaluate}人买过</span>
            </li>
         `
        }
        for (let k of data.data[2]) {
            remul.innerHTML += `
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
        secul.innerHTML += `
        <img src="${data.data[2][9].img1}" alt="">
                           <div class="right">
                               <p class="ellipsis">${data.data[2][9].title}</p>
                               <span>${data.data[2][9].reduce}
                               </span>
                               <div class="bootom">
                                   <p><span>¥</span>${data.data[2][9].price}</p>
                                   <div class="painc">
                                       <span>去抢购</span>
                                       <p>14:00:00</p>
                                   </div>
                               </div>
                           </div>
     `
        let lis = remul.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                localStorage.setItem('id', `${lis[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
        let lis1 = shopul.querySelectorAll('li');
        for (let i = 0; i < lis1.length; i++) {
            lis1[i].onclick = function () {
                localStorage.setItem('id', `${lis1[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
        let lis2 = hotul.querySelectorAll('li');
        for (let i = 0; i < lis2.length; i++) {
            lis2[i].onclick = function () {
                localStorage.setItem('id', `${lis2[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
    })


}
var gnav = document.querySelector('.goods .nav');
var gnavlis = document.querySelectorAll('.goods .nav li');
var gnavlis = document.querySelectorAll('.goods .nav li');
gnavlis[0].style.color = 'red';
for (var i = 0; i < gnavlis.length; i++) {
    gnavlis[i].onclick = function () {
        for (var i = 0; i < gnavlis.length; i++) {
            gnavlis[i].style.color = '';
        }
        this.style.color = 'red';
    }
}
gnavlis[0].onclick = function () {
    gnavlis[3].children[0].src = '../img/sxpng.png'
    for (var i = 0; i < gnavlis.length; i++) {
        gnavlis[i].style.color = '';
    }
    this.style.color = 'red';
}
// 点击按销量排
gnavlis[1].onclick = function () {
    goodsul.innerHTML = ''
    for (var i = 0; i < gnavlis.length; i++) {
        gnavlis[i].style.color = '';
    }
    this.style.color = 'red';
    gnavlis[3].children[0].src = '../img/sxpng.png'
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/sales',
    }).then(data => {
        for (let k of data.data) {
            goodsul.innerHTML += `
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
        let lis = goodsul.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                localStorage.setItem('id', `${lis[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
    })
}
// 
gnavlis[2].onclick = function () {
    goodsul.innerHTML = ''
    for (var i = 0; i < gnavlis.length; i++) {
        gnavlis[i].style.color = '';
    }
    this.style.color = 'red';
    gnavlis[3].children[0].src = '../img/sxpng.png'
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/good',
    }).then(data => {
        for (let k of data.data) {
            goodsul.innerHTML += `
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
        let lis = goodsul.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                localStorage.setItem('id', `${lis[i].id}`)
                window.location = 'http://127.0.0.1:3000/html/details.html'
            }
        }
    })
}
// 点击按价格排
var pflag = 0;
// 升序
gnavlis[3].onclick = function () {
    goodsul.innerHTML = ''
    for (var i = 0; i < gnavlis.length; i++) {
        gnavlis[i].style.color = '';
    }
    this.style.color = 'red';
    if (pflag == 0) {
        this.children[0].src = '../img/sxpng1.png'
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/pricea',
        }).then(data => {
            for (let k of data.data) {
                goodsul.innerHTML += `
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
            let lis = goodsul.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    localStorage.setItem('id', `${lis[i].id}`)
                    window.location = 'http://127.0.0.1:3000/html/details.html'
                }
            }
        })
        pflag = 1;
    } else {
        this.children[0].src = '../img/sxpng2.png'
        // 降序
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/priced',
        }).then(data => {
            for (let k of data.data) {
                goodsul.innerHTML += `
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
            let lis = goodsul.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    localStorage.setItem('id', `${lis[i].id}`)
                    window.location = 'http://127.0.0.1:3000/html/details.html'
                }
            }
        })
        pflag = 0;
    }
}


// 点击尾部里的nav里的li
var hnav = document.querySelector('.head .nav');
var hnav1 = document.querySelector('.head .nav1');
var flis = document.querySelectorAll('.foot li');
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
    bgc.style.backgroundImage = 'url(../img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < flis.length; i++) {
        flis[i].style.color = '';
    }
    this.style.color = '#f10000';
    for (var i = 0; i < navlis.length; i++) {
        navlis[i].children[0].style.opacity = '0';
    }
    navlis[0].children[0].style.opacity = '1';
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
    bgc.style.backgroundImage = 'url(../img/bgc.jpg!q80)';
    hnav.style.backgroundImage = '';
    for (var i = 0; i < flis.length; i++) {
        flis[i].style.color = '';
    }
    this.style.color = '#f10000';
    // 点击切换状态
    var details = document.querySelector('.details')
    var glliSrc = null;
    var glli = document.querySelectorAll('.goods .list li')
    var introduce = document.querySelector('.details .introduce');
    switchs.onclick = function () {
        if (flag3 == 0) {
            for (var i = 0; i < glli.length; i++) {
                glli[i].className = 'newstyle';
                flag3 = 1;
                this.children[0].src = '../img/cd1.png'
            }
        } else {
            for (var i = 0; i < glli.length; i++) {
                glli[i].className = '';
                flag3 = 0;
                this.children[0].src = '../img/cd.png'
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
flis[3].onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/order.html'
}
var lul = document.querySelector('.classification .box .list ul');
// 一进去先加载商品分类的所有商品
axios({
    method: 'post',
    url: 'http://127.0.0.1:3000/classfy',
    data: {
        index: '0'
    }
}).then(data => {
    for (let k of data.data) {
        lul.innerHTML += `
        <li id='${k.id}'>
        <img src="${k.img1}" alt="">
        <div class="content">
            <p class="ellipsis-2">
                <span>热销</span>
                ${k.title}
            </p>
            <span>本店电吹风热销第${k.ranking}名</span>
            <p>¥<i>${k.price}</i>.00 <span>${k.reduce}</span></p>
            <p>${k.evaluate}+条评价</p>
        </div>
    </li>
        `
    }
    let lis = lul.querySelectorAll('li');
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            localStorage.setItem('id', `${lis[i].id}`)
            window.location = 'http://127.0.0.1:3000/html/details.html'
        }
    }
})
//商品分类选项卡
var cflis = document.querySelectorAll('.classification .box>ul li');
for (var i = 0; i < cflis.length; i++) {
    cflis[i].index = i;
    cflis[i].onclick = function () {
        lul.innerHTML = ''
        for (var j = 0; j < cflis.length; j++) {
            cflis[j].style.backgroundColor = '';
            // lboxs[j].style.display = 'none';
        }
        this.style.backgroundColor = '#fff';
        // lboxs[this.index].style.display = 'block';
        let index = this.index;
        console.log(index);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/classfy',
            data: {
                index
            }
        }).then(data => {
            for (let k of data.data) {
                lul.innerHTML += `
                <li id='${k.id}'>
                <img src="${k.img1}" alt="">
                <div class="content">
                    <p class="ellipsis-2">
                        <span>热销</span>
                        ${k.title}
                    </p>
                    <span>本店电吹风热销第${k.ranking}名</span>
                    <p>¥<i>${k.price}</i>.00 <span>${k.reduce}</span></p>
                    <p>${k.evaluate}+条评价</p>
                </div>
            </li>
                `
                let lis = lul.querySelector('li');
            }
            let lis = lul.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    localStorage.setItem('id', `${lis[i].id}`)
                    window.location = 'http://127.0.0.1:3000/html/details.html'
                }
            }
        })

    }
}

// 滚动事件
hnavTop = hnav.offsetTop;
window.onscroll = function () {
    if (window.pageYOffset >= hnavTop) {
        hnav.className = 'navchange nav';
        hnav1.className = 'navchange nav1';
    } else {
        hnav.className = 'nav';
        hnav1.className = 'nav1'
    }
}
