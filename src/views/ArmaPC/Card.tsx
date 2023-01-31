import style from "./armado.module.css";

function Card(props: any) {
  return (
    <div>
      <div className={style.card}>
        <div className={style.titleImg}>
          <img className={style.imgCard} src={props.img} alt="" />
          <div>
            <div className={style.name}>{props.name}</div>
            <div>${props.price}</div>
          </div>
        </div>
        <div className={style.compatible}></div>
      </div>
    </div>
  );
}

export default Card;
