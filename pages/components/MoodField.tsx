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
    try {
    const response = await fetch('/api/hello', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( { position: position }),
    });

    const data = await response.json();
    
    // Validate API call was succesfully made.
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`)
    }

    setCollapse(data.result);
    setPosition("");

      } catch (error) {

        // Additional error handling beyond unsucessful api call
        console.error(error);
        alert(error.message);
      }
    }




    return (
<div className="mt-5 mb-5 d-flex flex-column">
  
  <label htmlFor="position"
   className="block text-4xl font-sans text-green-700 d-flex justify-content-center">
    
    Position
  </label>
<div className="input-icon-group d-flex mt-5 mb-5 justify-content-center">
<Buttonly/>
  <input
    type="text"
    id="user-position"
    placeholder="At this point in time, I want to type..."
    value={position}
    className="w-50 rounded-md sm:text-sm bg-gradient-to-r from-green-50 via-orange-50 to-white-100 outline-none"
    onChange={ (e) => setPosition(e.target.value)}
  />
  </div>
  <div className="d-flex justify-content-center mb-2.5">{collapse}</div>
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