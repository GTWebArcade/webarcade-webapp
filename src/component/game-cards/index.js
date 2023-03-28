import styles from './styles.module.css';

function GameCard(props) {
  return (
    <div>
        <div className={styles.header}>{props.header}</div>
        <div className={styles.body}>{props.body}</div>
    </div>
  );
}

export default GameCard;
