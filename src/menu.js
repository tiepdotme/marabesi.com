const topMenu = document.querySelector('.top-menu')
const menuList = document.querySelector('#menu-list')

document.querySelector('#menu').addEventListener('click', function () {
    if (menuList.classList.contains('flex')) {
        menuList.classList.remove('flex')
        menuList.classList.add('hidden')

        topMenu.classList.remove('flex')
        topMenu.classList.add('hidden')

        menuList.classList.remove('open')
    } else {
        menuList.classList.remove('hidden')
        menuList.classList.add('flex')

        topMenu.classList.remove('hidden')
        topMenu.classList.add('flex')

        menuList.classList.add('open')
    }
});