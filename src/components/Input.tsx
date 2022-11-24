
interface propsInput{
 title:string;
 placeholder:string;
 classname:string;
}
export function Input(props:propsInput){
 return(
  <input className={props.classname}  title={props.title} placeholder={props.placeholder}/>
 )
}