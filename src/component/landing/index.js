import styles from './styles.module.css';

function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p className={styles.dummyStyle}>Landing page</p>
        <a href='/sign-in'>Sign In</a>
        <a href='/sign-up'>Sign Up</a>
    </div>
  );
}

export default LandingPage;
