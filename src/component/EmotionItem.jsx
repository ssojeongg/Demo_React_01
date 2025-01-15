import "./EmotionItem.scss"
const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  const handleOnClick = () => {
    onClick(id)
  }
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={handleOnClick}
      >
      <div className="EmotionItem_box">
        <img src={img} alt={`emotion${id}`} />
        <span>{name}</span>
      </div>
      </div>
    
  )
} 
export default EmotionItem;