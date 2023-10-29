import styles from "./Footer.module.css";

interface FooterProps {
    children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                           { children }
        </div>
        </div>
    )
}