import React from 'react'
import Typed from 'typed.js';
import Container from './components/Container';

const AutoTyped = () => {
    const el = React.useRef(null);

    React.useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['<i>Ok</i>NrSr?', "Karz's Project!!"],
        typeSpeed: 50,
        backSpeed: 40,
        loop: true,
        loopCount: Infinity,
      });
  
      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }, []);
  
    return (
        <div className="text-blue-700 text-3xl font-bold mb-3">
        <span ref={el} />
        </div>
    );

 
}

export default AutoTyped