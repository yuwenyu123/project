require.config({
    paths:{
        'jquery':'./../lib/jquery-3.2.1', 
        'gscarousel':'./../lib/jquery-gsCarousel/jquery.gsCarousel',
        'gscarousel_small':'./../lib/jquery-gsCarousel_small/jquery.gsCarousel',
        'http':'./httpclient',
        'gdszoom':'./../lib/magnifying'
    },
    shim:{
        'gscarousel':['jquery'],
        'gscarousel_small':['jquery'],
        'http':['jquery'],
        'gdszoom':['jquery']
    }
})