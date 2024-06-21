import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlaceComponent() {
    const { placeId } = useParams();
    const [placedata, setPlaceData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const {data} = await axios.get("/places/" + placeId);
          console.log(data);
          setPlaceData(data);
        } catch (error) {
          console.error('Error fetching place data:', error);
        }
      }
  
      fetchData();
    }, [placeId]);
  
    useEffect(() => {
      console.log('placedata after update:', placedata);
    }, [placedata]);
  
    return (
      <div className="">
        {placedata.title}
      </div>
    );
  }
  

export default PlaceComponent;
