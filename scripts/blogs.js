$('.blog-search>ion-icon').on('click', () => {
    $('.search-box').removeClass('inactive-search');
    setTimeout(() => {
        $('.search-icon').addClass('search-blue');
        $('.search-box').removeClass('search-text-white');
        setTimeout(() => {
            $('.search-box').focus();
        }, 666);
    }, 334);
})

$('body').on('click', (e) => {
    if (!e.target.classList.contains('search-box') && !e.target.classList.contains('search-icon') && !$('.search-box').hasClass('inactive-search') && !e.target.classList.contains('close-icon')) {
        if ($('.search-box').val() === '') {
            $('.search-box').addClass('search-text-white');
            $('.search-box').addClass('inactive-search');
            setTimeout(() => {
                $('.search-icon').removeClass('search-blue')
            }, 334);
        }
    }
})

$('.blog-like>path').on('click', e => {
    if (!e.target.parentElement.classList.contains('like-fill')) {
        e.target.parentElement.classList.add('like-fill');
        return;
    }
    e.target.parentElement.classList.remove('like-fill');
})

var search;

$('.search-box').on('keydown', (e) => {
    if ($('.search-box').val() === '' && $('.close-icon').hasClass('blog-display-none') && String.fromCharCode(e.keyCode).match(/(\w|\s)/g) && e.key !== 'Tab') {
        $('.search-icon').addClass('blog-display-none')
        $('.close-icon').removeClass('blog-display-none')
    }
    clearTimeout(search)
})

$('.search-box').on('keyup', (e) => {
    if ($('.search-box').val().length === 0 && !$('.close-icon').hasClass('blog-display-none')) {
        $('.close-icon').addClass('blog-display-none');
        $('.search-icon').removeClass('blog-display-none');
    }
    if ($('.search-box').val() === '') {
        $('.blog-post').addClass('blog-hidden');
        $('.search-empty').addClass('blog-hidden');
        setTimeout(() => {
            $('.search-empty').addClass('blog-display-none');
            $('.blog-post').addClass('blog-display-none');
            clearTimeout(search);
            const posts = $('.blog-post');
            posts.removeClass('blog-display-none');
            setTimeout(() => {
                posts.removeClass('blog-hidden');
            }, 50)
            return;
        }, 600);
    }

    if (e.key !== 'Backspace' && e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Tab' && e.key !== 'Meta') {
        if (e.key === 'Enter') {
            clearTimeout(search);
            checkBlogs();
            return;
        }
        if (/[a-zA-Z0-9]/g.test(e.key)) {
            clearTimeout(search);
            search = setTimeout(checkBlogs, 500);
        }
    }
})

const checkBlogs = () => {
    $('.search-empty').addClass('blog-hidden');
    setTimeout(() => {
        $('.search-empty').addClass('blog-hidden');
        $('.lds-spinner').removeClass('blog-hidden');
    }, 500);
    const posts = $('.blog-post');
    const sVal = $('.search-box').val().toLowerCase();
    posts.addClass('blog-hidden')
    let falseArr = [];
    setTimeout(() => {
        posts.addClass('blog-display-none');
        for (let i = 0; i < posts.length; i++) {
            const title = $(posts[i].children[1].children[0]).text().toLowerCase();
            const summary = $(posts[i].children[1].children[1]).text().toLowerCase();
            const tags = $(posts[i]).data('tags');
            if (title.includes(sVal) || summary.includes(sVal) || tags.includes(sVal)) {
                falseArr.push(true)
                $('.lds-spinner').addClass('blog-hidden');
                $(posts[i]).removeClass('blog-display-none');
                setTimeout(() => {
                    $(posts[i]).removeClass('blog-hidden');
                }, 50);
                continue;
            }
            falseArr.push(false);
        }
        const isAllFalse = (v) => v === false;
        if (falseArr.every(isAllFalse)) {

            $('.search-empty').removeClass('blog-display-none');
            setTimeout(() => {
                $('.lds-spinner').addClass('blog-hidden');
                $('.search-empty').removeClass('blog-hidden');
            }, 500);
        }
    }, 500);
}

$('.close-icon').on('click', () => {
    $('.search-box').val('');
    $('.close-icon').addClass('blog-display-none');
    $('.search-icon').removeClass('blog-display-none');
    $('.search-empty').addClass('blog-hidden');
    $('.search-empty').addClass('blog-display-none');
    $('.blog-post').addClass('blog-hidden');
    setTimeout(() => {
        $('.blog-post').removeClass('blog-display-none');
        setTimeout(() => {
            $('.blog-post').removeClass('blog-hidden');
        }, 50);
    }, 500);
})