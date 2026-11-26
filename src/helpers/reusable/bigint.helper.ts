 const bigIntConversion = (data:any)=>{
   return JSON.parse(
     JSON.stringify(data,(_,value)=>{
        return typeof value === "bigint"?value.toString():value;
    })
   );
}

export default bigIntConversion;