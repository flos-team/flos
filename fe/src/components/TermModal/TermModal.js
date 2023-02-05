import TermText from  './TermText/TermText.js'
import styles from './TermModal.module.css'
import closeIcon from '../../assets/RegisterAsset/fi-br-cross-small.png'


function TermModal({ setOpenModal }) {
  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalheader}>
        <h3>Flos 이용약관 동의</h3>
        <img src={closeIcon} alt='' onClick={closeModal} className={styles.cursorpointer}></img>
      </div>
      <div className={styles.modalbodyterm}>
        <TermText/>
      </div>
      <div className={styles.modalfooter}>
        <span className={styles.modalfootertext} onClick={closeModal}>확인</span>
      </div>
    </div>
  )
}

export default TermModal