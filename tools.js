class Watch{
    constructor(page,data,watch){
        this.page=page?page:{};
      Object.keys(watch).forEach(v=>{
          let reg=new RegExp("[.]")
          if(v.match(reg)){
           let arr=v.split(".");
           let nowData = data; // 将data赋值给nowData
            for (let i = 0; i < arr.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
                nowData = nowData[arr[i]]; // 将nowData指向它的key属性对象
            }
            let lastKey = arr[arr.length-1];
            console.log(nowData)
            this.observe(nowData,lastKey,watch[v])
            
          }else{
            this.observe(data,v,watch[v])
          }
          
      })
    }

    observe(data,key,cb){
        let val=data[key];
        let that=this
        Reflect.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            set(value){
                cb(value,val)
                val=value
                new Computed(that.page,that.page["computed"])
            },
            get(){
               
               return val;
            }
        })       
    }


}

class Computed{

     constructor(page,obj){
    this.page=page?page:{}
    let that=this;
    Object.keys(obj).forEach(v=>{
       that.init(obj,v) 
    })
     }

     init(obj,key){
       
   let a= obj[key].call(this.page)
   console.log(a)
     }
}


export {Watch,Computed};