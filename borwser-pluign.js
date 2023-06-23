const SERVICE_URL = 'http://127.0.0.1:3000/download'
function watchKeyboard() {
	$(document).keypress((e) => {
		console.log(e.keyCode)
		switch(e.keyCode) {
			case 98:
				// b
			case 119:
				// w
				goPrevious()
				break
			case 101:
				// e
				goNext()
				break
			case 114:
				// r
				window.location.reload()
				break
			case 115:
				// s
				downloadImg()
				break
		}
	})
}

function downloadImg() {
	const imgs = $('.content img')
	const urls = []
	for (const img of imgs) {
		urls.push(
			fetch(SERVICE_URL, {
				method: 'POST',
				mode: 'cors',
				headers: {
			    	"Content-Type": "application/json",
			    },
				body: JSON.stringify({
					url: img.src
				})
			}).then((res) => {
				if (res.status !== 200) {
					throw new Error('error')
				}
			})
		)
	}
	Promise.all(urls).then(() => {
		console.log('done')
		showNotify('success', '下载成功')
	}).catch(e => {
		showNotify('error', '保存图片错误，请检查服务！')
	})
	
}

/**
 * type 'warning' | 'error' | 'info' | 'success'
 */
function showNotify(type, text) {
	const params = {
		heading: type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : type === 'success' ? 'Success' : 'Info',
		icon: type
	}
	$.toast({
	    ...params,
	    text,
	    loader: true,        // Change it to false to disable loader
	    loaderBg: '#9EC600'  // To change the background
	})
}

function goNext() {
	const ele = getATagByHtml('下页')
	if (ele) {
		window.location.href = ele.href
	} else {
		showNotify('warning', '这是最后一页了！')
	}
}

function goPrevious() {
	const ele = getATagByHtml('上页')
	if (ele) {
		window.location.href = ele.href
	} else {
		showNotify('warning', '这是第一页了！')
	}
}

function getATagByHtml(htmlstr) {
	const res = $(`a:contains('${htmlstr}')`)
	if (res.length > 0) {
		return res[0]
	}
}

function preLoadNextPage() {
	const nextPage = getATagByHtml('下页')
	if (!nextPage) {
		return
	}
	const iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	iframe.src = nextPage.href
	document.body.appendChild(iframe)
}

function loadCss (url) {
	const link = document.createElement('link')
	link.href = url
	link.rel = 'stylesheet'
	link.type = 'text/css'
	document.body.appendChild(link)
}



function init() {
	watchKeyboard()
	setTimeout(function() {
		preLoadNextPage()
	}, 500);
	loadCss('https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.css')
}

init()