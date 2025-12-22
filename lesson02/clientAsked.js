'use strict'
const http = require('http')


function cache(func){ 
	let memory = {}
	return function(...args){ 
		let key = args.toString()
		if (!(key in memory)) memory[key] = func(...args)
		return memory[key]
	}
} 



const getOnes = () => {
    let arr = []

    for (let i = 0; i < 10000000; i++) {
        arr.push(1)
    }
    // массив с 10000 значений

    for (let i = 0; i < arr.length; i++) {
        arr.pop()
    }

    return 1007

}

function benchmark(fn) {
    return function() {
        let start = new Date()
        console.log('функция запущена: ' + start )

        fn()

        

        let end = new Date()
        let result = (end - start)
        console.log('время затраченное на выполение функции: ' + (end - start) + 'мс' )

        return result

    }
}




const handler = (request, response) => {

    if (request.url === '/') {

        let t1 = new Date()
        console.log('старт вычислений 1')
        let testCalc1 = cache(getOnes)
        testCalc1()
        console.log('время без кеша' + (new Date() - t1))

        console.log('старт вычислений 2')
        let t2 = new Date()
        let testCalc2 = cache(getOnes)
        testCalc2()
        console.log('время c кешем' + (new Date() - t2))

        let test1 = benchmark(getOnes)
            

            let result = ''

            let names = Object.keys(request.headers)

            for (let i = 0; i < names.length; i++ ) {
                result += '<p>' + names[i]  + ':' + request.headers[names[i]] + '</p>'
            }

            response.end(
                `
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <!-- div>${result}</div-->
                            <div>${test1()}</div>
                        </body>
                    </html>
                
                `
            )
    }
    
    
}


const server = http.createServer(handler)

server.listen(3001, (e)=>{
    if (e) console.log(e)
    console.log('сервер запущен')
})