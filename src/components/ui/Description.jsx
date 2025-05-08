import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Description = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-2">
      <AnimatePresence initial={false}>
        <motion.p
          key={isExpanded ? 'expanded' : 'collapsed'}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-gray-600 cursor-pointer ${!isExpanded && 'line-clamp-2'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {description}
        </motion.p>
      </AnimatePresence>
      
      {!isExpanded && description && description.length > 100 && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="text-sm text-primary mt-1 hover:underline"
        >
          Voir plus
        </button>
      )}
    </div>
  );
};

export default Description;