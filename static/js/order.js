let ul = document.querySelector('.order .store .main-store ul')
let ret = document.querySelector('.order .top i')
let lis = document.querySelectorAll('.order .list li')
let tick = document.querySelector('.order .tick')
lis[0].style.color = 'red'
// 清空购物车页面商品
axios({
    method: 'get',
    url: `http://127.0.0.1:3000/empty`
})
// 清空结算页面商品
axios({
    method: 'get',
    url: `http://127.0.0.1:3000/empty1`
})
// 渲染页面
axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/getstate/0'
}).then(data => {
    for (let k of data.data) {
        if (k.state == 2) {
            ul.innerHTML += `
            <li id='${k.id}'>
            <div class="pic">
                <img src="${k.img}" alt="">
            </div>
            <div class="main-text">
                <p class="ellipsis">${k.title}</p>
                <p>${k.size}</p>
                <div class="price">
                    <p>￥<span>${k.price}.</span>00
                        <i></i>
                        <span>x${k.num3}</span>
                    </p>
                </div>
                <div class="jump-del">
                    <ul>
                        <li>支持7天无理由退货</li>
                        <li>30天价保</li>
                        <li>${k.size}</li>
                    </ul>
                </div>
                <div class="btn">
                    <div class="cancle bgc1">取消</div>
                    <div class="pay bgc2">去支付</div>
                </div>
            </div>
        </li>
            `
        } else {
            ul.innerHTML += `
            <li id='${k.id}'>
            <div class="pic">
                <img src="${k.img}" alt="">
            </div>
            <div class="main-text">
                <p class="ellipsis">${k.title}</p>
                <p>${k.size}</p>
                <div class="price">
                    <p>￥<span>${k.price}.</span>00
                        <i></i>
                        <span>x${k.num3}</span>
                    </p>
                </div>
                <div class="jump-del">
                    <ul>
                        <li>支持7天无理由退货</li>
                        <li>30天价保</li>
                        <li>${k.size}</li>
                    </ul>
                </div>
                <div class="btn">
                    <div class="bgc1">已完成</div>
                    <div class="bgc2 again">再次购买</div>
                </div>
            </div>
        </li>
            `
        }
    }
    // 待支付点击事件
    let pay = document.querySelectorAll('.order .main-store .pay')
    let cel = document.querySelectorAll('.order .main-store .cancle')
    for (let i = 0; i < pay.length; i++) {
        pay[i].onclick = function () {
            // 点击后切换状态
            let id = this.parentNode.parentNode.parentNode.id;
            let bgc1 = this.parentNode.querySelector('.bgc1')
            let size = this.parentNode.parentNode.children[1].innerHTML
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/switch/${id}/1/${size}`
            }).then(res => {
                this.innerHTML = '再次购买'
                bgc1.innerHTML = '已完成'
            })
            tick.style.animation = 'exhibit 1s forwards';
            tick.innerHTML = '支付成功'
            setTimeout(function () {
                tick.style.animation = '';
            }, 1000)

        }
    }
    for (let i = 0; i < cel.length; i++) {
        cel[i].onclick = function () {
            // 点击后切换状态
            let id = this.parentNode.parentNode.parentNode.id;
            let bgc2 = this.parentNode.querySelector('.bgc2')
            let size = this.parentNode.parentNode.children[1].innerHTML
            axios({
                method: 'get',
                url: `http://127.0.0.1:3000/switch/${id}/3/${size}`
            }).then(res => {
                this.innerHTML = '已取消'
                bgc2.innerHTML = '再次购买'
            })
            tick.style.animation = 'exhibit 1s forwards';
            tick.innerHTML = '支付失败'
            setTimeout(function () {
                tick.style.animation = '';
            }, 1000)

        }
    }
})

// 点击切换状态
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.color = '#000'
        }
        this.style.color = 'red'
        ul.innerHTML = '';
        axios({
            method: 'get',
            url: `http://127.0.0.1:3000/getstate/${i}`
        }).then(data => {
            if (i == 0) {
                for (let k of data.data) {
                    if (k.state == 1) {
                        ul.innerHTML += `
                        <li id='${k.id}'>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class="bgc1">已完成</div>
                                <div class="bgc2 again">再次购买</div>
                            </div>
                        </div>
                    </li>
                        `
                    }
                    else if (k.state == 2) {
                        ul.innerHTML += `
                        <li id='${k.id}'>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class="cancle bgc1">取消</div>
                                <div class="pay bgc2">去支付</div>
                            </div>
                        </div>
                    </li>
                        `
                    } else {
                        ul.innerHTML += `
                        <li id='${k.id}'>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class="bgc1">已取消</div>
                                <div class="bgc2 again">再次购买</div>
                            </div>
                        </div>
                    </li>
                        `
                    }
                }
                // 待支付点击事件
                let pay = document.querySelectorAll('.order .main-store .pay')
                let cel = document.querySelectorAll('.order .main-store .cancle')
                for (let i = 0; i < pay.length; i++) {
                    pay[i].onclick = function () {
                        // 点击后切换状态
                        let id = this.parentNode.parentNode.parentNode.id;
                        let bgc1 = this.parentNode.querySelector('.bgc1')
                        let size = this.parentNode.parentNode.children[1].innerHTML
                        axios({
                            method: 'get',
                            url: `http://127.0.0.1:3000/switch/${id}/1/${size}`
                        }).then(res => {
                            this.innerHTML = '再次购买'
                            bgc1.innerHTML = '已完成'
                        })
                        tick.style.animation = 'exhibit 1s forwards';
                        tick.innerHTML = '支付成功'
                        setTimeout(function () {
                            tick.style.animation = '';
                        }, 1000)

                    }
                }
                for (let i = 0; i < cel.length; i++) {
                    cel[i].onclick = function () {
                        // 点击后切换状态
                        let id = this.parentNode.parentNode.parentNode.id;
                        let bgc2 = this.parentNode.querySelector('.bgc2')
                        let size = this.parentNode.parentNode.children[1].innerHTML
                        axios({
                            method: 'get',
                            url: `http://127.0.0.1:3000/switch/${id}/3/${size}`
                        }).then(res => {
                            console.log(11111);
                            this.innerHTML = '已取消'
                            bgc2.innerHTML = '再次购买'
                        })
                        tick.style.animation = 'exhibit 1s forwards';
                        tick.innerHTML = '支付失败'
                        setTimeout(function () {
                            tick.style.animation = '';
                        }, 1000)

                    }
                }
            } else {
                for (let k of data.data) {
                    if (k.state == 1) {
                        ul.innerHTML += `
                        <li>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class="bgc1">已完成</div>
                                <div class="again bgc2">再次购买</div>
                            </div>
                        </div>
                    </li>
                        `
                    } else if (k.state == 2) {
                        ul.innerHTML += `
                        <li id='${k.id}'>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class="cancle bgc1">取消</div>
                                <div class="pay bgc2">去支付</div>
                            </div>
                        </div>
                    </li>
                        `
                        let pay = document.querySelectorAll('.order .main-store .pay')
                        let cel = document.querySelectorAll('.order .main-store .cancle')
                        for (let i = 0; i < pay.length; i++) {
                            pay[i].onclick = function () {
                                // 点击后切换状态
                                let id = this.parentNode.parentNode.parentNode.id;
                                let size = this.parentNode.parentNode.children[1].innerHTML
                                axios({
                                    method: 'get',
                                    url: `http://127.0.0.1:3000/switch/${id}/1/${size}`
                                }).then(res => {
                                    this.parentNode.parentNode.parentNode.style.display = 'none'
                                })
                                tick.style.animation = 'exhibit 1s forwards';
                                tick.innerHTML = '支付成功'
                                setTimeout(function () {
                                    tick.style.animation = '';
                                }, 1000)
                            }
                        }
                        for (let i = 0; i < cel.length; i++) {
                            cel[i].onclick = function () {
                                // 点击后切换状态
                                let id = this.parentNode.parentNode.parentNode.id;
                                let size = this.parentNode.parentNode.children[1].innerHTML
                                axios({
                                    method: 'get',
                                    url: `http://127.0.0.1:3000/switch/${id}/3/${size}`
                                }).then(res => {
                                    this.parentNode.parentNode.parentNode.style.display = 'none'
                                })
                                tick.style.animation = 'exhibit 1s forwards';
                                tick.innerHTML = '支付失败'
                                setTimeout(function () {
                                    tick.style.animation = '';
                                }, 1000)
                            }
                        }
                    } else {
                        ul.innerHTML += `
                        <li>
                        <div class="pic">
                            <img src="${k.img}" alt="">
                        </div>
                        <div class="main-text">
                            <p class="ellipsis">${k.title}</p>
                            <p>${k.size}</p>
                            <div class="price">
                                <p>￥<span>${k.price}.</span>00
                                    <i></i>
                                    <span>x${k.num3}</span>
                                </p>
                            </div>
                            <div class="jump-del">
                                <ul>
                                    <li>支持7天无理由退货</li>
                                    <li>30天价保</li>
                                    <li>${k.size}</li>
                                </ul>
                            </div>
                            <div class="btn">
                                <div class=" bgc1">已取消</div>
                                <div class="again bgc2">再次购买</div>
                            </div>
                        </div>
                    </li>
                        `
                    }
                }
            }
        })
    }
}

//返回首页
ret.onclick = function () {
    window.location.href = 'http://127.0.0.1:3000/html/index.html'
}