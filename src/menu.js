const menuList = document.querySelector('#menu-list')

document.querySelector('#menu').addEventListener('click', function () {
    if (menuList.classList.contains('flex')) {
    menuList.classList.remove('flex')
    menuList.classList.add('hidden')
    } else {
    menuList.classList.remove('hidden')
    menuList.classList.add('flex')
    menuList.classList.add('open')
    }
});