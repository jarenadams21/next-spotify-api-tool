import {GrBeacon} from 'react-icons/gr';
import {useState} from 'react';
import {SiApachespark} from 'react-icons/si';

function PositionField() {
  
  const [position, setPosition] = useState("");
  const [collapse, setCollapse] = useState("init");
  const [iconActive, setIconActive] = useState(false);

  function Buttonly() {
  
  
    return (
      iconActive ? (
        <div>
          <SiApachespark className="me-5" size={40} onClick={positionSubmitted}/>
          </div>
      ) : (
          <GrBeacon className="me-5 animate-bounce" size={40} onClick={positionSubmitted}/>
      )
    )
  }

  async function positionSubmitted(event) {

    // Reset flag
    setIconActive(!iconActive);

      }




    return (
<div className="mt-5 mb-5">
  
  <label htmlFor="position"
   className="block text-4xl font-sans text-green-700">
    
    Position
  </label>
<div className="input-icon-group d-flex justify-content-center mt-5 mb-5">
<Buttonly/>
  <input
    type="text"
    id="user-position"
    placeholder="At this point in time, I want to type..."
    value={position}
    className="w-50 rounded-md sm:text-sm bg-gradient-to-r from-cyan-50 via-cyan-100 to--100 outline-none"
    onChange={ (e) => setPosition(e.target.value)}
  />
  </div>
  <div>{collapse}</div>
  <img src="https://i0.wp.com/www.alittlebithuman.com/wp-content/uploads/2021/03/schrodingers-cat.jpg"/>
</div>


    )
}


function MoodField() {

    return (
        <div>
            <PositionField/>
        </div>
    )
}


export default MoodField;