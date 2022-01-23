import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import database from 'src/firebase_init';
import { ref, onValue } from "firebase/database";
import Marker from './Marker';
import useToken from 'src/useToken';
import Toast from '../reusable/toast';
import ToastMaker from '../reusable/toastMaker'
import ReactLoading from 'react-loading';

export const MapLocation =(props)=>{
    const [data, setData] = useState([]);
    const token = useToken();
    const { toasters, addToast } = ToastMaker();
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);
    const [center, setCenter] = useState({
        lat: -8.62315378880902,
        lng: 115.42926424589213
    });
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
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
                setLoading(false);
            }
        }, {
            onlyOnce: false
        });
    },[]);

    useEffect(() => {
        if (props.id_keberangkatan) {
            const dataFilter = data.filter(item => item.id_keberangkatan === props.id_keberangkatan);
            if (dataFilter.length > 0) {
                const lat = dataFilter[0].latitude,
                lng = dataFilter[0].longitude;
                //focus to the ship marker
                setCenter({
                    lat,
                    lng
                });
                setZoom(16);
            }
        }
    },[props.id_keberangkatan]);
    
    const _showToast = () => {
        setTitle("Terjadi kesalahan");
        setMessage('Coba beberapa saat lagi');
        setColor("bg-danger text-white");
        addToast();
    }

    return(
        <div style={{ height: '80vh', width: '100%' }}>
            {loading &&
            <div className='loading-container padding-top-md'>
                <ReactLoading type={'spin'} color={'#11b1f7'} height={30} width={30} />
                <p className='text-bold margin-top-xs'>Memuat Lokasi Kapal...</p>
            </div>
            }
            <Toast toasters={toasters} message={message} title={title} color={color}/>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDi8pAFaNLoQPDgUaeH9tg4sN1G3jRc50o"}}
                defaultCenter={{
                lat: -8.62315378880902,
                lng: 115.42926424589213
                }}
                center={center}
                defaultZoom={12}
                zoom={zoom}
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