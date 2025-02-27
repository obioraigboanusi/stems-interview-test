import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
//
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

export default function TextAnimate({ ...props }) {
  const { text, variants, sx, ...other } = props;
  return (
    <motion.h1
      style={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}>
      {text.split('').map((letter: any, index: any) => (
        <motion.span
          key={index}
          variants={variants || varFadeInUp}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
