import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ----------------------------------------------------------------------

MotionInView.propTypes = {
  children: PropTypes.node,
  variants: PropTypes.object,
  transition: PropTypes.object,
  triggerOnce: PropTypes.bool,
  threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};

export default function MotionInView({ ...props }) {
  const { children, variants, transition, threshold, ...other } = props;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold || 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start(Object.keys(variants)[1]);
    } else {
      controls.start(Object.keys(variants)[0]);
    }
  }, [controls, inView, variants]);

  return (
    <motion.div
      ref={ref}
      initial={Object.keys(variants)[0]}
      animate={controls}
      variants={variants}
      transition={transition}
      {...other}>
      {children}
    </motion.div>
  );
}
