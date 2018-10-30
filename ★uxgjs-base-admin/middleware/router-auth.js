export default function ({ store, redirect, route }) {

  // 강제로그인으로 할 경우 아래의 주석을 해제함
  if (!isLogin(store) && route.name !== 'account-login') {
    return redirect('/account/login')
  }

  if (isLogin(store) && route.name === 'account-login') {
    return redirect('/account')
  }

  if (!isLogin(store) && isAdminRoute(route)) {
    return redirect('/account/login')
  }
}



const isLogin = (store) => {
  return (store && store.state && store.state.user)
}

const isAdminRoute = (route) => {
  if (route.matched.some(record => record.path === '/admin')) {
    return true
  }
}
