import request from '../utils/request'

//请求逻辑实例化

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