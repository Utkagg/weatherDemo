const request=require('request')

const forecast=(lat,long,callback)=>{
    debugger
    const url='http://api.weatherstack.com/current?access_key=df81dcbcb78648865f74140460ec8d06&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url,json:true},(error,{body}=response)=>{
    
        //console.log(response.body.current)
        if(error){
            callback('unable to connect to the network',undefined)
        }
        else if(body.error){
            debugger
            callback(undefined,'unable to find requested url,try again')
        }
        else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelLike:body.current.feelslike,
                weatherDescription:body.current.weather_descriptions[0]
            })
        }
        
    })    
}
module.exports=forecast