import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IconBtn = ({classname, icon, id})=>{
  const handleClick = ()=> document.querySelector(`#card_${id}`).classList.toggle("showOptions");

  return (
    <button className={classname} id={id} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export const IconBtnSubmenu = ({classname, icon})=>{
  return (
    <button className={classname}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}