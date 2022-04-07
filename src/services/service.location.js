import axios from "axios"
import { apiUrl } from './../reusable/constants'

export const getKeberangkatanDetail = async (
    id_keberangkatan, 
    token,
    onSuccess,
    onFailed
    ) => {
        // console.log(id_keberangkatan);
    const result = await axios.get(apiUrl + 'detail-jadwal/'+id_keberangkatan, {
        headers: {
            'Authorization': "bearer " + token 
        },
        timeout: 10000 
    })
    .catch(function (error) {
        onFailed();
      if(error.response?.status === 401){
          localStorage.removeItem('access_token')
          window.location.reload()
      }
    });
    const response = result.data.jadwal;
    if (response.length > 0) {
        onSuccess(response[0]);
        return;
    }
    onFailed();
}