import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import database from 'src/firebase_init';
import { ref, onValue } from "firebase/database";
import Marker from './Marker';
import useToken from 'src/useToken';
import Toast from '../reusable/toast';
import ToastMaker from '../reusable/toastMaker'

export const MapLocation =(props)=>{
    const [data, setData] = useState([]);
    const token = useToken();
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")
    useEffect(() => {
        onValue(ref(database, '/position/'), (snapshot) => {
            let dataTmp = [];
            if (props.id) {
                snapshot.forEach((child)=>{
                    if (child.val().id_armada == props.id) {
                        dataTmp.push({
                            eventId: child.key,
                            heading: child.val().heading,
                            id_keberangkatan: child.val().id_keberangkatan,
                            id_nahkoda: child.val().id_nahkoda,
                            latitude: child.val().latitude,
                            longitude: child.val().longitude
                        });
                    } 
                });
                setData(dataTmp);
            }else {
                snapshot.forEach((child)=>{
                    dataTmp.push({
                        eventId: child.key,
                        heading: child.val().heading,
                        id_keberangkatan: child.val().id_keberangkatan,
                        id_nahkoda: child.val().id_nahkoda,
                        latitude: child.val().latitude,
                        longitude: child.val().longitude
                    });
                    
                });
                setData(dataTmp);
            }
        }, {
            onlyOnce: false
        });
    },[]);

    const _showToast = () => {
        setTitle("Terjadi kesalahan");
        setMessage('Coba beberapa saat lagi');
        setColor("bg-danger text-white");
        addToast();
    }

    return(
        <div style={{ height: '80vh', width: '100%' }}>
            <Toast toasters={toasters} message={message} title={title} color={color}/>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDi8pAFaNLoQPDgUaeH9tg4sN1G3jRc50o"}}
                defaultCenter={{
                lat: -8.62315378880902,
                lng: 115.42926424589213
                }}
                defaultZoom={12}
            >
                {data.map((item, idx)=> {
                    return(
                        <Marker
                            key={item.id_keberangkatan}
                            lat={item.latitude}
                            lng={item.longitude}
                            heading={item.heading}
                            id_keberangkatan={item.id_keberangkatan}
                            token={token}
                            showToast={_showToast}
                        />
                    );
                })}
            </GoogleMapReact>
        </div>
    );
}