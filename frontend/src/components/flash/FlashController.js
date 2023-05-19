import { Alert } from "react-bootstrap";
import styles from "./FlashController.module.css";
import useFlash from "../../hooks/useFlash";
import { AnimatePresence, motion } from "framer-motion";
import LoadingLine from "../ui/LoadingLine";

const FlashController = () => {
  const { getMessage, clearMessage } = useFlash();
  const message = getMessage();

  return (
    <>
      <AnimatePresence>
        {message && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            exit={{ opacity: 0, y: -100 }}
            className={styles.container}
          >
            <Alert
              variant={message?.variant}
              className={styles.alert}
              onClose={clearMessage}
              dismissible
            >
              <div className={styles.content}>
                {message?.header && (
                  <Alert.Heading>{message.header}</Alert.Heading>
                )}
                {message?.text && <p>{message.text}</p>}
              </div>
              {message?.delay && (
                <LoadingLine timer={`${message.delay / 1000}s`} />
              )}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlashController;
