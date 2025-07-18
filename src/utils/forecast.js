import request from "request"

const forecast = (a,b,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=1ab3674aeb663bd8e0c98a6dc5d65f33&query='+ a +','+ b +'&units=f'
    
    
     request({url,json:true},(error,{body})=>{

        if(error){
            callback('unable to connect to weather seervice!',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+ ".it is currently "+ body.current.temperature + " degrees and feels like "+ body.current.feelslike+ "degress out. the humidity is " + body.current.humidity+ "%")
        }
            
     })

}

export{
    forecast
}