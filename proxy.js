class proxy{
  constructor(options,data){
      this.page=options?options:{};
      const newData=options.data?options.data:{};
       this.observe(newData,options);
  }
  observe(data,options){
    let that=options;
    this.$data=new Proxy(data,{
       get(target,key){
        return target[key]
       },
       set(target,key,value,receiver){
        let res = Reflect.set(target, key, value,receiver);
        that.setData({
         [key]:value
        })
        
         return res;

       }

    })
    
  }
  
}

export default proxy;