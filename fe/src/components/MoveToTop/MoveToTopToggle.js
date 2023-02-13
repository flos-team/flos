import MoveToTopBtn from '../../assets/GlobalAsset/movetotop.png'
import styles from './MoveToTopToggle.module.css'

function MoveToTopToggle() {

    const MoveToTop = () => {
      const top = document.getElementById("postMain").children.item(0);
      top.scrollIntoView(false, {behavior: 'smooth'});
    };

    
    // const postList = document.getElementById("postlist").scrollIntoView(true);
    return (
    <div className={styles.arrowiconposition}>
        <img className={styles.arrowicon} alt='' src={MoveToTopBtn} onClick={MoveToTop}></img>
    </div>
  )
}

export default MoveToTopToggle;