import { motion } from 'framer-motion';
//
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

export default function MotionContainer({ ...props }) {
  const { open, children, ...other } = props;
  return (
    <motion.div
      initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      {...other}>
      {children}
    </motion.div>
  );
}
