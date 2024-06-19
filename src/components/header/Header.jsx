
import style from "./Header.module.scss";

const Header = ({setSubject,subject}) => {


  return (
    <div className={style.container}>
      <div className={style.items}>
        <button onClick={()=>setSubject(0)} style={{backgroundColor:subject===0?'#627ee3':null,color:subject===0? 'white':null}} type="button">SCIENCE</button>
        <button onClick={()=>setSubject(1)} style={{backgroundColor:subject===1?'#627ee3':null,color:subject===1? 'white':null}} type="button">MATHEMATICS</button>
        <button onClick={()=>setSubject(2)} style={{backgroundColor:subject===2?'#627ee3':null,color:subject===2? 'white':null}} type="button">SOCIAL SCIENCE</button>
        <button onClick={()=>setSubject(3)} style={{backgroundColor:subject===3?'#627ee3':null,color:subject===3? 'white':null}} type="button">MENTAL ABILITY</button>
      </div>
    </div>
  );
};

export default Header;
