import request from '../utils/request'

// instantiate logic

const stations = {

    getList: (params) => {
        let data = request.get('/api/search', params)
            .then((response) => {
                return response
            })
        return data
    }
}

export default stations