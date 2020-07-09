export function wx_login(body){
    wx.request({
        url: 'http://localhost:8090/user_info/action/login',
        method: 'POST',
        data: body,
        success(res){
            console.log(res)
            wx.hideLoading()
            wx.showToast({title: '登录成功', mask:true})
        },
        fail(res){
            console.log(res)
            wx.hideLoading()
            wx.showToast({title: '登录失败！请检查网络', icon: 'none', duration: 4000, mask:true})
        }
    })
}
