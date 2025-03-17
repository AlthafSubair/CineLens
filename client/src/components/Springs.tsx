import { motion } from "framer-motion";

interface springProps {
    height: number,
    width: number,
    left: number,
    right: number,
    top: number,
    bottom: number
    x: number,
    y: number
}

const Springs = ({height, width, left, right, top, bottom, x,y}: springProps) => {
  return (
    <motion.div
    initial={{x: 0, y: 0 }}
    animate={{x,y }}
    transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }} 
    style={{height: height, width: width, left: `${left}%`, right: `${right}%`, top: `${top}%`, bottom: `${bottom}%`}}
    className="absolute rounded-full bg-gradient-radial from-[#0085FF]  mix-blend-overlay backdrop-blur-md opacity-50 blur-sm inset-0">
    </motion.div>
  )
}

export default Springs