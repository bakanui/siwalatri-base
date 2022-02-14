import React, {Component} from 'react';
import image from '../assets/img/kapalMarker.png';
import shipStir from '../assets/img/ship-stir.png';
import jangkar from '../assets/img/jangkar.png';
import { getKeberangkatanDetail } from 'src/services/service.location';
import ReactLoading from 'react-loading';

export default class Marker extends Component{
    constructor(props){
        super(props);
        this.state = {
          show: false,
          data: null,
          loading: false
        }
    }

  static defaultProps = {};

  _onMarkerClicked = () => {
    this.setState({
      show: !this.state.show,
      loading: true
    });
    getKeberangkatanDetail(
      this.props.id_keberangkatan, 
      this.props.token,
      (data) => {
        this.setState({
          data,
          loading: false
        });
      },
      () => {
        this.props.showToast();
        this.setState({
          loading: false,
          show: false
        });
      }
      );
  }

  _hideTootips = () => {
    this.setState({
      show: false
    });
  }

  render() {
    const { show, loading, data } = this.state;
    console.log(data)
    return (
       <div>
         {show && loading ?
         <div className='tool-tips flex-center padding-top-md'>
          <ReactLoading type={'spin'} color={'#11b1f7'} height={30} width={30} />
          <p className='text-bold margin-top-xs'>Memuat...</p>
         </div> 
         :
         show && !loading ? 
         <div className='tool-tips'>
            <div className='row-flex'>
              <div className='blue-circle'/>
              <span className='text-bold margin-left-sm'>{data.dermaga_awal}</span>
            </div>
              <span className='label-text margin-left-lg'>{data.lokasi_awal || '-'}</span>
            <div className='row-flex margin-top-md'>
              <div className='red-circle'/>
              <span className='text-bold margin-left-sm'>{data.dermaga_akhir}</span>
            </div>
            <span className='label-text margin-left-lg'>{data.lokasi_akhir}</span>
            <div className='row-flex-space-between margin-top-md'>
              <div className='row-flex'>
                <img src={shipStir} className='custom-icon'/>
                <p className='text-bold margin-left-sm'>{data.nama_nahkoda}</p>
              </div>
              <div className='row-flex'>
                <img src={jangkar} className='custom-icon'/>
                <p className='text-bold margin-left-sm'>{data.nama_kapal || '-'}</p>
              </div>
            </div>
            <div className='hr'/>
            <div className='row-flex-space-between margin-top-md'>
              <p className='text-bold'>Jadwal Keberangkatan</p>
              <p className='text-bold primary-text'>{data.jadwal.substring(0,5)}</p>
            </div>
            <div className='row-flex-space-between'>
              <p className='text-bold'>Jumlah Penumpang</p>
              <p className='text-bold'>{data.total_penumpang || '-'} orang</p>
            </div>
            <button onClick={this._hideTootips} className="btn btn-primary btn-block btn-blue">Tutup</button>
          </div>
         : null}
         <img onClick={this._onMarkerClicked} className='marker' src={image} style={{transform: `rotate(${this.props.heading}deg)`}}/>
       </div>
    );
  }
}