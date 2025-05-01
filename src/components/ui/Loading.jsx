import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {/* Spinner principal */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
      
      {/* Effet de vague textuel */}
      <div className="flex space-x-2">
        {['u', 'n', ' ', 'i', 'n', 's', 't', 'a', 'n', 't', ' ', 's', 'v', 'p', '.', '.', '.'].map((letter, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.1,
            }}
            className="text-lg text-gray-600"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Loading;