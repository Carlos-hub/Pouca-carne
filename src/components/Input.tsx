
interface propsInput{
 title:string;
 placeholder:string;
 classname:string;
 type:string;
 icon?:any;
}
export function Input(props:propsInput){
 return(
  <div className="flex bg-white rounded-xl p-2">
    <input className={props.classname}  type={props.type} title={props.title} placeholder={props.placeholder}/>
    {props.icon}
  </div>
 )
}