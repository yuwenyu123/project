define(['jquery'], function($){
    var baseUrl = "http://localhost:88/src/api/";
    function filterUrl(_url){
        // if(_url.startsWith('http')){
        if(_url.startsWith('./')){
            return _url;
        }  
        return baseUrl + _url;
    }

    return {
        get: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    // url: _url,
                    data: _data || {},
                    success: function(res){
                        resolve(res)
                    },
                    error: function(error){
                        reject(error)
                    }
                })
            })
        },
        post: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    // rl: _url,
                    data: _data || {},
                    type: 'post',
                    success: function(res){
                        resolve(res)
                    },
                    error: function(error){
                        reject(error)
                    }
                })
            })
        },
    }
})